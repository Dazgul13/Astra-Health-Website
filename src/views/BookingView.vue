<template>
  <section class="booking">
    <section class="booking__hero section">
      <div class="container">
        <h1 data-reveal>Pre-Admission</h1>
        <p data-reveal>Configure your care journey in four gentle steps.</p>
      </div>
    </section>

    <section class="booking__funnel section">
      <div class="container">
        <nav class="booking__progress" aria-label="Booking progress">
          <span v-for="(step, idx) in steps" :key="idx" class="booking__dot" :class="{ 'is-done': currentStep > idx, 'is-active': currentStep === idx }" aria-current="step" />
        </nav>

        <div v-if="currentStep === 1" class="booking__step" role="group" aria-labelledby="step1-title">
          <h2 id="step1-title">Choose your package</h2>
          <LuxurySelectCard v-model="form.packageTier" :options="packageOptions" label="Package tier" />
          <div class="booking__actions">
            <button class="btn btn-primary" type="button" @click="next">Continue</button>
          </div>
        </div>

        <div v-if="currentStep === 2" class="booking__step" role="group" aria-labelledby="step2-title">
          <h2 id="step2-title">Expected delivery timeline</h2>
          <RangeBoundary v-model="form.monthsExpected" :min="1" :max="12" :min-label="`1 month`" :max-label="`12 months`" />
          <ul class="booking__milestones">
            <li v-for="m in computedMilestones" :key="m.label">{{ m.label }}</li>
          </ul>
          <div class="booking__actions">
            <button class="btn btn-outline" type="button" @click="prev">Back</button>
            <button class="btn btn-primary" type="button" @click="next">Continue</button>
          </div>
        </div>

        <div v-if="currentStep === 3" class="booking__step" role="group" aria-labelledby="step3-title">
          <h2 id="step3-title">Care enhancements</h2>
          <div class="booking__enhancements">
            <button v-for="opt in enhancements" :key="opt.value" type="button" class="btn btn-outline enhancement-chip" :class="{ 'is-selected': selectedEnhancements.includes(opt.value) }" @click="toggleEnhancement(opt.value)">{{ opt.label }}</button>
          </div>
          <div class="booking__actions">
            <button class="btn btn-outline" type="button" @click="prev">Back</button>
            <button class="btn btn-primary" type="button" @click="next">Continue</button>
          </div>
        </div>

        <div v-if="currentStep === 4" class="booking__step" role="group" aria-labelledby="step4-title">
          <h2 id="step4-title">Contact details</h2>
          <p class="booking__hint">Used for callback, text confirmation, and receipt delivery.</p>
          <div class="booking__contact-grid">
            <label class="luxury-input">
              <span class="luxury-input__label">Email</span>
              <input class="luxury-input__field" type="email" v-model="form.contactEmail" placeholder="you@example.com" autocomplete="email" />
            </label>
            <label class="luxury-input">
              <span class="luxury-input__label">Phone</span>
              <input class="luxury-input__field" type="tel" v-model="form.contactPhone" placeholder="09XX XXX XXXX" autocomplete="tel" />
            </label>
          </div>
          <div class="booking__actions">
            <button class="btn btn-outline" type="button" @click="prev">Back</button>
            <button class="btn btn-primary" type="button" @click="next">Continue</button>
          </div>
        </div>

        <div v-if="currentStep === 5" class="booking__step" role="group" aria-labelledby="step5-title">
          <h2 id="step5-title">Your configuration</h2>
          <div class="booking__summary">
            <div class="booking__summary-row">
              <span class="booking__summary-label">Package</span>
              <span class="booking__summary-value">{{ selectedPackageLabel }}</span>
            </div>
            <div class="booking__summary-row">
              <span class="booking__summary-label">Timeline</span>
              <span class="booking__summary-value">{{ form.monthsExpected }} {{ form.monthsExpected === 1 ? 'month' : 'months' }}</span>
            </div>
            <div class="booking__summary-row">
              <span class="booking__summary-label">Enhancements</span>
              <span class="booking__summary-value">{{ selectedEnhancements.length ? selectedEnhancements.join(', ') : 'None' }}</span>
            </div>
            <div class="booking__summary-row">
              <span class="booking__summary-label">Email</span>
              <span class="booking__summary-value">{{ form.contactEmail || '—' }}</span>
            </div>
            <div class="booking__summary-row">
              <span class="booking__summary-label">Phone</span>
              <span class="booking__summary-value">{{ form.contactPhone || '—' }}</span>
            </div>
          </div>
          <p v-if="statusMsg" class="booking__status">{{ statusMsg }}</p>
          <div class="booking__actions">
            <button class="btn btn-outline" type="button" @click="prev" :disabled="loading">Back</button>
            <button class="btn btn-primary" type="button" @click="submit" :disabled="loading || submitted">{{ loading ? 'Submitting…' : (submitted ? 'Submitted' : 'Confirm & Submit') }}</button>
          </div>
        </div>
      </div>
    </section>

    <div v-if="loading" class="booking__loading" aria-live="polite" aria-busy="true">
      <div class="booking__loading-inner">
        <span class="booking__spinner" aria-hidden="true"></span>
        <p>Submitting your configuration…</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LuxurySelectCard from '../components/LuxurySelectCard.vue'
import RangeBoundary from '../components/RangeBoundary.vue'

const router = useRouter()
const emit = defineEmits(['toast'])

const steps = ['Package', 'Timeline', 'Enhancements', 'Contact', 'Review']

const form = reactive({
  packageTier: 'essentials',
  monthsExpected: 7,
  contactEmail: '',
  contactPhone: ''
})

const packageOptions = [
  { label: 'Essentials Birth Package', value: 'essentials', desc: 'Focused clinical excellence' },
  { label: 'Comfort Birth Package', value: 'comfort', desc: 'Enhanced comfort options' },
  { label: 'Concierge Prenatal', value: 'concierge', desc: 'Intimate, personalized care' },
  { label: 'Newborn Telemetry Suite', value: 'newborn', desc: 'Advanced neonatal care' }
]

const enhancements = [
  { label: 'Lactation Consult', value: 'lactation' },
  { label: 'Lullaby Nursery', value: 'lullaby' },
  { label: 'Family Photography', value: 'photography' },
  { label: 'Nutritional Coaching', value: 'nutrition' }
]
const selectedEnhancements = ref([])
const currentStep = ref(1)
const loading = ref(false)
const submitted = ref(false)
const statusMsg = ref('')
const bookingNumber = ref('')

const selectedPackageLabel = computed(() => {
  const opt = packageOptions.find(p => p.value === form.packageTier)
  return opt ? opt.label : form.packageTier
})

function toggleEnhancement(value) {
  const idx = selectedEnhancements.value.indexOf(value)
  if (idx < 0) selectedEnhancements.value.push(value)
  else selectedEnhancements.value.splice(idx, 1)
}
function next() { if (currentStep.value < 5) currentStep.value++ }
function prev() { if (currentStep.value > 1) currentStep.value-- }

const milestonesByMonth = {
  1: ['Early prenatal assessment', 'Establish care plan'],
  3: ['Structural wellness review', 'Nutrition plan finalized'],
  5: ['Birthing preferences workshop', 'Postpartum planning'],
  7: ['Trial rooming-in', 'Final newborn prep'],
  9: ['Final obstetric review', 'Emergency protocol walkthrough'],
  12: ['Full maternal review', 'Transition planning']
}
function getMilestonesFor(month) {
  const keys = Object.keys(milestonesByMonth).map(Number)
  const applicable = keys.filter((k) => month >= k).sort((a, b) => b - a)
  return applicable.slice(0, 2).flatMap((k) => milestonesByMonth[k])
}
const computedMilestones = computed(() => getMilestonesFor(form.monthsExpected))

const payload = computed(() => ({
  packageTier: form.packageTier,
  monthsExpected: form.monthsExpected,
  enhancements: selectedEnhancements.value,
  contactEmail: form.contactEmail,
  contactPhone: form.contactPhone,
  generatedAt: new Date().toISOString()
}))

function emitToast(message, type = 'success') {
  emit('toast', { message, type })
}

function validateContact() {
  if (!form.contactEmail || !form.contactPhone) {
    statusMsg.value = 'Please provide both email and phone number.'
    return
  }
  next()
}
function resetForm() {
  form.packageTier = 'essentials'
  form.monthsExpected = 7
  form.contactEmail = ''
  form.contactPhone = ''
  selectedEnhancements.value = []
  currentStep.value = 1
  submitted.value = false
  statusMsg.value = ''
}

async function submit() {
  statusMsg.value = ''
  loading.value = true
  try {
    const apiUrl = import.meta.env.VITE_API_URL || '/api/intake'
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload.value)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Submission failed')

    bookingNumber.value = data.id || `AH-${Date.now().toString(36).toUpperCase()}`
    submitted.value = true
    emitToast('Booking confirmed! Redirecting...', 'success')
    resetForm()
    setTimeout(() => {
      router.push({ path: '/booking/confirmation', query: { bookingNumber: bookingNumber.value } })
    }, 1200)
  } catch (err) {
    statusMsg.value = err.message || 'Something went wrong. Please try again.'
    emitToast(statusMsg.value, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return
  gsap.fromTo('.booking__step', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.booking__funnel', start: 'top 76%' } })
})

defineExpose({ leave: () => ScrollTrigger.getAll().forEach((t) => t.kill()) })
</script>

<style scoped>
.booking__hero {
  padding: calc(var(--header-height) + 4rem) 0 2rem;
  background: var(--color-bg);
}
.booking__funnel {
  padding: 3rem 0 6rem;
  background: var(--color-bg-soft);
}
.booking__hero h1 {
  margin-bottom: 0.6rem;
}
.booking__progress {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
}
.booking__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border);
  transition: background var(--transition-soft);
}
.booking__dot.is-active {
  background: var(--color-text);
}
.booking__dot.is-done {
  background: var(--color-secondary);
}
.booking__step {
  max-width: 780px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.booking__step h2 {
  font-size: 1.45rem;
  font-weight: 400;
  color: var(--color-text);
}
.booking__hint {
  font-size: 0.92rem;
  color: var(--color-text-muted);
  margin-top: -0.5rem;
}
.booking__contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.booking__milestones {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-white);
}
.booking__milestones li {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  padding-left: 1.1rem;
  position: relative;
}
.booking__milestones li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-text-muted);
}
.booking__enhancements {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}
.enhancement-chip {
  border-radius: 999px;
  padding: 0.65rem 1.2rem;
  font-size: 0.9rem;
  transition: background var(--transition-soft), color var(--transition-soft), border-color var(--transition-soft);
}
.enhancement-chip.is-selected {
  background: var(--color-text);
  border-color: var(--color-text);
  color: var(--color-white);
}
.booking__actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}
.booking__summary {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.2rem;
}
.booking__summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--color-border);
}
.booking__summary-row:last-child {
  border-bottom: none;
}
.booking__summary-label {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}
.booking__summary-value {
  font-size: 1rem;
  color: var(--color-text);
  font-weight: 500;
  max-width: 60%;
  text-align: right;
}
.booking__status {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  background: var(--color-bg-cream);
  padding: 0.9rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}
.booking__loading {
  position: fixed;
  inset: 0;
  z-index: 1500;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.booking__loading-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--color-text);
  font-size: 0.95rem;
  letter-spacing: 0.04em;
}
.booking__spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-text);
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.luxury-input__field {
  width: 100%;
  padding: 0.85rem 1rem;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--color-text);
  transition: border-color var(--transition-soft);
}
.luxury-input__field:focus {
  outline: none;
  border-color: var(--color-focus);
}
@media (max-width: 520px) {
  .booking__contact-grid {
    grid-template-columns: 1fr;
  }
}
.booking__spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-text);
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
