import express from 'express'
import fs from 'fs'
import { Resend } from 'resend'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '.env') })

const app = express()
app.use(express.json({ limit: '1mb' }))

const PORT = process.env.PORT || 3001

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*'
const MAIL_FROM = process.env.MAIL_FROM || 'AstraHealth Birthing Center <onboarding@resend.dev>'
const SUBMISSIONS_LOG = process.env.SUBMISSIONS_LOG || process.platform === 'win32' ? 'server/submissions.log' : '/var/log/submissions.log'

const resend = new Resend(RESEND_API_KEY)

const ALLOWED_ORIGINS = new Set([
  process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  'https://astrahealthmed.vercel.app'
].filter(Boolean))

app.use((req, res, next) => {
  const origin = req.headers.origin
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Credentials', 'true')
  }
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
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

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})

app.post('/api/intake', async (req, res) => {
  try {
    const { packageTier, monthsExpected, enhancements, contactEmail, contactPhone, generatedAt } = req.body || {}
    const entry = {
      packageTier: tierLabel(packageTier),
      monthsExpected,
      enhancements: enhancements && enhancements.length ? enhancements : [],
      contactEmail: contactEmail || '',
      contactPhone: contactPhone || '',
      submittedAt: generatedAt || new Date().toISOString()
    }

    const bookingId = `AH-${Date.now().toString(36).toUpperCase()}`
    appendLog({ ...entry, bookingId })

    if (!RESEND_API_KEY || !contactEmail) {
      return res.status(200).json({ message: 'Intake captured.', id: bookingId })
    }

    const adminEmails = ['dazgulyt@gmail.com']

    const tasks = [
      resend.emails.send({
        from: MAIL_FROM,
        to: adminEmails,
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
        ].join('\n')
      })
    ]

    if (contactEmail) {
      tasks.push(
        resend.emails.send({
          from: MAIL_FROM,
          to: [contactEmail],
          subject: `Booking Confirmation — ${bookingId}`,
          text: [
            'Booking Confirmation — AstraHealth Birthing Center',
            '----------------------------',
            `Booking Number: ${bookingId}`,
            `Package: ${entry.packageTier}`,
            `Expected delivery: ${entry.monthsExpected} months`,
            `Enhancements: ${entry.enhancements.join(', ') || 'None'}`,
            `Contact: ${entry.contactEmail || 'N/A'} / ${entry.contactPhone || 'N/A'}`,
            `Submitted: ${entry.submittedAt}`,
            '',
            'Thank you for choosing AstraHealth. Our team will contact you shortly.'
          ].join('\n')
        })
      )
    }

    const results = await Promise.allSettled(tasks)
    const failed = results.find(r => r.status === 'rejected')
    if (failed) {
      const err = failed.reason?.message || 'Mail delivery failed'
      console.error('Mail error:', err)
      appendLog({ ...entry, bookingId, mailError: err })
    } else {
      appendLog({ ...entry, bookingId })
    }

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
