<template>
  <section class="home">
    <section class="home__hero section">
      <div class="container">
        <div
          data-reveal
          class="home__hello"
        >
          <h1>Welcome to<br>AstraHealth Birthing Center</h1>
          <p>Where new life begins with care, dignity, and quiet confidence.</p>
          <router-link
            to="/booking"
            class="btn btn-primary"
          >
            Book Consultation
          </router-link>
        </div>
      </div>
    </section>

    <section
      class="home__why section"
      aria-labelledby="why-heading"
    >
      <div class="container">
        <h2
          id="why-heading"
          data-reveal
        >
          Why Choose Us
        </h2>
        <p
          data-reveal
          class="home__why-lead"
        >
          A boutique birthing experience built on clinical precision, organic comfort, and unwavering trust.
        </p>
        <div class="home__why-grid" data-reveal>
          <div class="why-card">
            <span class="why-card__icon" aria-hidden="true">✦</span>
            <h3>Private Birth Suites</h3>
            <p>Spacious, hotel-caliber suites designed for calm, dignity, and focused labor support.</p>
          </div>
          <div class="why-card">
            <span class="why-card__icon" aria-hidden="true">✧</span>
            <h3>Concierge Prenatal Care</h3>
            <p>Personalized check-ins, nutritional planning, and 24-hour clinical hotline access.</p>
          </div>
          <div class="why-card">
            <span class="why-card__icon" aria-hidden="true">❋</span>
            <h3>Newborn Telemetry</h3>
            <p>Continuous neonatal monitoring with advanced nursery transition protocols.</p>
          </div>
          <div class="why-card">
            <span class="why-card__icon" aria-hidden="true">✶</span>
            <h3>Post-Natal Partnership</h3>
            <p>Home follow-up visits, lactation support, and recovery-focused follow-through.</p>
          </div>
        </div>
      </div>
    </section>

    <section
      class="home__faq section"
      aria-labelledby="faq-heading"
    >
      <div class="container">
        <h2
          id="faq-heading"
          data-reveal
        >
          Frequently Asked Questions
        </h2>
        <div class="faq-list" data-reveal>
          <div
            v-for="item in faqs"
            :key="item.question"
            class="faq-item"
          >
            <button
              class="faq-item__question"
              type="button"
              :aria-expanded="openFaq === item.question"
              @click="toggleFaq(item.question)"
            >
              <span>{{ item.question }}</span>
              <span class="faq-item__icon" aria-hidden="true">{{ openFaq === item.question ? '−' : '+' }}</span>
            </button>
            <div
              class="faq-item__answer"
              :class="{ 'is-open': openFaq === item.question }"
              :hidden="openFaq !== item.question"
            >
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="home__reviews section"
      aria-labelledby="reviews-heading"
    >
      <div class="container">
        <h2
          id="reviews-heading"
          data-reveal
        >
          Family Testimonials
        </h2>
        <FbFeedbackCarousel ref="carousel" />
      </div>
    </section>

    <section
      class="home__map section"
      aria-labelledby="map-heading"
    >
      <div class="container">
        <h2
          id="map-heading"
          data-reveal
        >
          Where To Find Us!
        </h2>
        <MapModule />
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FbFeedbackCarousel from '../components/FbFeedbackCarousel.vue'
import MapModule from '../components/MapModule.vue'

const carousel = ref(null)
const openFaq = ref(null)

const faqs = [
  {
    question: 'What makes AstraHealth different from a hospital maternity ward?',
    answer: 'AstraHealth is a boutique birthing center designed around low-intervention, family-centered care. Our suites, staffing ratios, and protocols are tailored to create a calm, private, and personalized birth experience.'
  },
  {
    question: 'Do you accept PhilHealth?',
    answer: 'Yes. We support PhilHealth accreditation and can guide you through the maternity package benefits and claims process during your prenatal intake.'
  },
  {
    question: 'Can my family stay with me during labor and delivery?',
    answer: 'Absolutely. Our suites are designed for family inclusion. Partners, doulas, and designated support persons are welcome in the birthing room.'
  },
  {
    question: 'What newborn services are available right after birth?',
    answer: 'We provide immediate newborn assessment, thermal regulation, and optional Newborn Telemetry Suite monitoring. Our neonatologist and nursing team ensure a smooth transition from womb to world.'
  },
  {
    question: 'How do I schedule a facility tour?',
    answer: 'Use the Book Consultation button to submit your preferred timeline and package. Our coordinator will reach out within 24 hours to arrange a private tour.'
  }
]

function toggleFaq(question) {
  openFaq.value = openFaq.value === question ? null : question
}

function killTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill())
}

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return
  gsap.fromTo(
    document.querySelectorAll('[data-reveal]'),
    { opacity: 0, y: 34 },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: document.querySelector('[data-reveal]'),
        start: 'top 78%'
      }
    }
  )
})

defineExpose({ leave: killTriggers })
</script>

<style scoped>
.home__hero {
  padding: calc(var(--header-height) + 5rem) 0 5rem;
  min-height: 88vh;
  background:
    radial-gradient(1200px 800px at 80% -10%, #e8f0f1, transparent 70%),
    radial-gradient(900px 700px at -10% 20%, #f1f4f0, transparent 70%),
    var(--color-bg);
  display: flex;
  align-items: center;
}
.home__hello {
  max-width: 760px;
}
.home__hello h1 {
  margin-bottom: 1.5rem;
  color: var(--color-text);
}
.home__hello p {
  margin-bottom: 2rem;
  max-width: 58ch;
}
.home__faq {
  padding: 5rem 0 6rem;
  background: var(--color-bg-soft);
}
.home__faq h2 {
  margin-bottom: 0.6rem;
}
.faq-list {
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--color-border);
  border-top: 1px solid var(--color-border);
}
.faq-item {
  background: var(--color-white);
}
.faq-item__question {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 1.2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 1.05rem;
  color: var(--color-text);
  transition: color var(--transition-soft);
}
.faq-item__question:hover {
  color: var(--color-text-secondary);
}
.faq-item__icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  display: grid;
  place-items: center;
  font-size: 1rem;
  color: var(--color-text-secondary);
  flex-shrink: 0;
  transition: all var(--transition-soft);
}
.faq-item__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 280ms ease, opacity 260ms ease;
  opacity: 0;
}
.faq-item__answer.is-open {
  max-height: 300px;
  opacity: 1;
}
.faq-item__answer p {
  padding: 0 0 1.2rem;
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  max-width: 70ch;
}
.home__why {
  padding: 5rem 0 6rem;
  background: var(--color-bg);
}
.home__why h2 {
  margin-bottom: 0.6rem;
}
.home__why-lead {
  margin-bottom: 3rem;
  max-width: 70ch;
}
.home__why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}
.why-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  transition: transform var(--transition-soft), border-color var(--transition-soft);
}
.why-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-text);
}
.why-card__icon {
  font-size: 1.3rem;
  color: var(--color-primary);
}
.why-card h3 {
  font-size: 1.15rem;
  font-weight: 400;
  color: var(--color-text);
}
.why-card p {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 55ch;
}
.home__reviews {
  padding: 4rem 0 6rem;
  background: var(--color-bg-soft);
}
.home__reviews h2 {
  margin-bottom: 2rem;
}
.home__why {
  padding: 5rem 0 6rem;
  background: var(--color-bg);
}
.home__why h2 {
  margin-bottom: 0.6rem;
}
.home__why-lead {
  margin-bottom: 3rem;
  max-width: 70ch;
}
.home__why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}
.why-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  transition: transform var(--transition-soft), border-color var(--transition-soft);
}
.why-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-text);
}
.why-card__icon {
  font-size: 1.3rem;
  color: var(--color-primary);
}
.why-card h3 {
  font-size: 1.15rem;
  font-weight: 400;
  color: var(--color-text);
}
.why-card p {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 55ch;
}
</style>
