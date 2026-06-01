<template>
  <section class="services">
    <section class="services__hero section">
      <div class="container">
        <h1 data-reveal>
          Services &amp; Packages
        </h1>
        <p data-reveal>
          Precision-crafted maternity care, calibrated to your journey.
        </p>
      </div>
    </section>

    <section class="services__filters section">
      <div class="container">
        <nav
          class="services__filter-nav"
          aria-label="Filter by tier"
        >
          <button
            v-for="f in filters"
            :key="f.value"
            class="services__filter"
            :class="{ 'is-active': activeFilter === f.value }"
            type="button"
            @click="setFilter(f.value)"
          >
            <span class="services__filter-label">{{ f.label }}</span>
          </button>
        </nav>

        <div
          class="services__grid"
          data-reveal
        >
          <article
            v-for="pkg in filteredPackages"
            :key="pkg.id"
            class="package-card"
            tabindex="0"
          >
            <h3 class="package-card__title">
              {{ pkg.title }}
            </h3>
            <p class="package-card__desc">
              {{ pkg.desc }}
            </p>
            <ul class="package-card__features">
              <li
                v-for="feat in pkg.features"
                :key="feat"
              >
                {{ feat }}
              </li>
            </ul>
            <div class="package-card__footer">
              <span class="package-card__tier">{{ pkg.tier }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const filters = [
  { label: 'All Packages', value: 'all' },
  { label: 'Tier-1 Suites', value: 'tier1' },
  { label: 'Concierge', value: 'concierge' },
  { label: 'Newborn Care', value: 'newborn' }
]
const activeFilter = ref('all')

const packages = [
  {
    id: 1,
    tier: 'tier1',
    title: 'Essentials Birth Package',
    desc: 'A refined private birth suite with attentive clinical monitoring for a calm, supported delivery.',
    features: ['Private birth suite', 'Clinical monitoring', 'Nursing consult', 'Welcome kit']
  },
  {
    id: 2,
    tier: 'tier1',
    title: 'Comfort Birth Package',
    desc: 'Enhanced comfort-focused birthing experience with extended recovery options.',
    features: ['Private LDR suite', 'Birthing tools', 'Lactation visit', 'Postnatal checkup']
  },
  {
    id: 3,
    tier: 'concierge',
    title: 'Concierge Prenatal Care',
    desc: 'A personalized pre-natal partnership with scheduled intimate consultations.',
    features: ['Bi-weekly checkups', 'Nutritional plan', '24h hotline', 'Birth planning']
  },
  {
    id: 4,
    tier: 'concierge',
    title: 'Post-Natal Concierge',
    desc: 'Comprehensive post-birth recovery support and newborn transition coaching.',
    features: ['Home follow-up', 'Recovery consult', 'Newborn photography', 'Donation planning']
  },
  {
    id: 5,
    tier: 'newborn',
    title: 'Newborn Telemetry Suite',
    desc: 'State-of-the-art newborn monitoring and neonatal transition care with real-time telemetry.',
    features: ['24h monitoring', 'Advanced nursery', 'Neo consult', 'Parent education']
  },
  {
    id: 6,
    tier: 'newborn',
    title: 'Sensory Nursery Package',
    desc: 'Designed for tranquility: low-noise nursery with regulated light, sound, and temperature.',
    features: ['Regulated environment', 'Gentle assessments', 'Parent rooming-in', 'Care plan']
  }
]

const filteredPackages = computed(() =>
  activeFilter.value === 'all' ? packages : packages.filter((p) => p.tier === activeFilter.value)
)

function setFilter(value) {
  activeFilter.value = value
}

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return

  gsap.fromTo(
    '.package-card',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.services__grid',
        start: 'top 75%'
      }
    }
  )
})

defineExpose({ leave: () => ScrollTrigger.getAll().forEach((t) => t.kill()) })
</script>

<style scoped>
.services__hero {
  padding: calc(var(--header-height) + 4rem) 0 2.5rem;
  background: var(--color-bg);
}
.services__hero h1 {
  margin-bottom: 0.6rem;
}
.services__filters {
  padding: 2rem 0 5rem;
  background: var(--color-bg-soft);
}
.services__filter-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 3rem;
}
.services__filter {
  background: transparent;
  border: 1px solid var(--color-border);
  padding: 0.6rem 1.1rem;
  border-radius: 999px;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: all var(--transition-soft);
}
.services__filter:hover {
  border-color: var(--color-text);
}
.services__filter.is-active {
  background: var(--color-text);
  border-color: var(--color-text);
  color: var(--color-white);
}
.services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.package-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  transition: transform var(--transition-soft), border-color var(--transition-soft);
  cursor: default;
}
.package-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-text);
}
.package-card__title {
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--color-text);
}
.package-card__desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.55;
}
.package-card__features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.package-card__features li {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  padding-left: 1.2rem;
  position: relative;
}
.package-card__features li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-text-muted);
}
.package-card__footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}
.package-card__tier {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-text-muted);
}
</style>
