import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '.env') })

const app = express()
app.use(express.json({ limit: '1mb' }))

const PORT = process.env.PORT || 3001

const MAIL_HOST = process.env.MAIL_HOST || 'smtp.gmail.com'
const MAIL_PORT = Number(process.env.MAIL_PORT || 465)
const MAIL_SECURE = process.env.MAIL_SECURE !== 'false'
const MAIL_USER = process.env.MAIL_USER || ''
const MAIL_PASS = process.env.MAIL_PASS || ''
const MAIL_TO = process.env.MAIL_TO || MAIL_USER
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*'
const SUBMISSIONS_LOG = process.env.SUBMISSIONS_LOG || path.join(process.cwd(), 'submissions.log')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_ORIGIN)
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: MAIL_SECURE,
  auth: MAIL_PASS ? { user: MAIL_USER, pass: MAIL_PASS } : undefined
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})

function tierLabel(packageTier) {
  const map = {
    essentials: 'Essentials Birth Package',
    comfort: 'Comfort Birth Package',
    concierge: 'Concierge Prenatal',
    newborn: 'Newborn Telemetry Suite'
  }
  return map[packageTier] || packageTier
}

function appendLog(entry) {
  const line = `${new Date().toISOString()}
${JSON.stringify(entry, null, 2)}
`
  fs.appendFileSync(SUBMISSIONS_LOG, line, 'utf-8')
}

function sendConfirmation(toEmail, bookingId, entry) {
  return transporter.sendMail({
    from: `"AstraHealth Intake" <${MAIL_USER}>`,
    to: toEmail,
    subject: `Booking Confirmation — ${bookingId}`,
    text: [
      'Your pre-admission configuration has been received.',
      '----------------------------',
      `Booking Number: ${bookingId}`,
      `Package: ${entry.packageTier}`,
      `Expected delivery: ${entry.monthsExpected} months`,
      `Enhancements: ${entry.enhancements.join(', ') || 'None'}`,
      `Submitted: ${entry.submittedAt}`
    ].join('\n')
  })
}

app.post('/api/intake', async (req, res) => {
  try {
    const { recaptchaToken, packageTier, monthsExpected, enhancements, contactEmail, contactPhone, generatedAt } = req.body || {}
    const entry = {
      packageTier: tierLabel(packageTier),
      monthsExpected,
      enhancements: enhancements && enhancements.length ? enhancements : [],
      contactEmail: contactEmail || '',
      contactPhone: contactPhone || '',
      submittedAt: generatedAt || new Date().toISOString()
    }

    const bookingId = `AH-${Date.now().toString(36).toUpperCase()}`

    if (!MAIL_PASS) {
      appendLog({ ...entry, bookingId })
      return res.status(200).json({ message: 'Intake captured and logged locally.', id: bookingId })
    }

    const tasks = [
      transporter.sendMail({
        from: `"AstraHealth Intake" <${MAIL_USER}>`,
        to: MAIL_TO,
        subject: 'New Booking Configuration — AstraHealth Birthing Center',
        text: [
          'New Pre-Admission Request',
          '----------------------------',
          `Booking Number: ${bookingId}`,
          `Package: ${entry.packageTier}`,
          `Expected delivery: ${entry.monthsExpected} months`,
          `Enhancements: ${entry.enhancements.join(', ') || 'None'}`,
          `Contact: ${entry.contactEmail || 'N/A'} / ${entry.contactPhone || 'N/A'}`,
          `Submitted: ${entry.submittedAt}`
        ].join('\n'),
        replyTo: MAIL_USER
      })
    ]

    if (contactEmail) {
      tasks.push(sendConfirmation(contactEmail, bookingId, entry))
    }

    const results = await Promise.allSettled(tasks)
    const failed = results.find(r => r.status === 'rejected')
    if (failed) throw new Error('Mail delivery failed')

    appendLog({ ...entry, bookingId, messageId: results[0].status === 'fulfilled' ? undefined : 'unknown' })
    res.status(200).json({ message: 'Configuration submitted.', id: bookingId })
  } catch (error) {
    console.error('Intake error:', error)
    res.status(500).json({ message: 'Server error while submitting configuration.' })
  }
})

app.listen(PORT, () => {
  console.log(`AstraHealth intake server running on http://localhost:${PORT}`)
  console.log(`Submissions log: ${SUBMISSIONS_LOG}`)
})
