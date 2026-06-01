<template>
  <section class="gallery">
    <section class="gallery__hero section">
      <div class="container">
        <h1 data-reveal>
          Facility Gallery
        </h1>
        <p data-reveal>
          Our birthing suites, nursery, and clinical spaces.
        </p>
      </div>
    </section>

    <section class="gallery__grid section">
      <div class="container">
        <nav
          class="gallery__tabs"
          aria-label="Album categories"
        >
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            class="gallery__tab"
            :class="{ 'is-active': activeTab === tab.key }"
            @click="switchTab(tab.key)"
          >
            {{ tab.label }}
          </button>
        </nav>

        <header class="gallery__album-header" data-reveal>
          <h2>{{ currentTab.label }}</h2>
          <p>{{ currentTab.desc }}</p>
        </header>

        <GalleryCarousel
          :images="currentTab.images"
          @select="handleSelect"
          @back="goBackToStart"
        />
      </div>
    </section>

    <Transition name="lightbox">
      <div
        v-if="active >= 0"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
      >
        <button
          class="lightbox__close"
          type="button"
          aria-label="Close"
          @click="close"
        >
          ✕
        </button>
        <button
          class="lightbox__nav lightbox__prev"
          type="button"
          aria-label="Previous"
          @click="nav(-1)"
        >
          ←
        </button>
        <img
          class="lightbox__img"
          :src="currentImage.src"
          :alt="currentImage.alt"
        >
        <button
          class="lightbox__nav lightbox__next"
          type="button"
          aria-label="Next"
          @click="nav(1)"
        >
          →
        </button>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GalleryCarousel from '../components/GalleryCarousel.vue'

const activeTab = ref('suites')
const active = ref(-1)

const tabs = [
  {
    key: 'suites',
    label: 'Delivery Suites',
    desc: 'Private birthing suites and delivery rooms.',
    images: [
      { src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80', alt: 'Private birthing suite' },
      { src: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&q=80', alt: 'Modern delivery room' },
      { src: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=900&q=80', alt: 'Premium amenities' }
    ]
  },
  {
    key: 'nursery',
    label: 'Newborn Nursery',
    desc: 'Nursery and neonatal care spaces.',
    images: [
      { src: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=900&q=80', alt: 'Newborn nursery care' },
      { src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=900&q=80', alt: 'Postnatal recovery suite' }
    ]
  },
  {
    key: 'clinical',
    label: 'Clinical Areas',
    desc: 'Consultation and monitoring rooms.',
    images: [
      { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=80', alt: 'Clinical consultation room' }
    ]
  }
]

const currentTab = computed(() => tabs.find((t) => t.key === activeTab.value) || tabs[0])
const currentImage = computed(() => {
  if (active.value < 0) return { src: '', alt: '' }
  return currentTab.value.images[active.value]
})

function switchTab(key) {
  activeTab.value = key
  active.value = -1
}
function handleSelect(i) {
  active.value = i
}
function close() { active.value = -1 }
function nav(delta) {
  active.value = (active.value + delta + currentTab.value.images.length) % currentTab.value.images.length
}

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return
  gsap.fromTo(
    '.gallery-carousel',
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.gallery__grid',
        start: 'top 78%'
      }
    }
  )
})

defineExpose({ leave: () => ScrollTrigger.getAll().forEach((t) => t.kill()) })
</script>

<style scoped>
.gallery__hero {
  padding: calc(var(--header-height) + 4rem) 0 2rem;
  background: var(--color-bg);
}
.gallery__grid {
  padding: 1.5rem 0 6rem;
  background: var(--color-bg-soft);
}
.gallery__hero h1 {
  margin-bottom: 0.6rem;
}
.gallery__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 2rem 0 2rem;
}
.gallery__tab {
  background: transparent;
  border: 1px solid var(--color-border);
  padding: 0.6rem 1.1rem;
  border-radius: 999px;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-soft);
}
.gallery__tab:hover {
  border-color: var(--color-text);
}
.gallery__tab.is-active {
  background: var(--color-text);
  border-color: var(--color-text);
  color: var(--color-white);
}
.gallery__album-header {
  margin-bottom: 1.25rem;
}
.gallery__album-header h2 {
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-text);
}
.gallery__album-header p {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin-top: 0.2rem;
}
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(17, 17, 17, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.lightbox__img {
  max-width: min(1100px, 92vw);
  max-height: 88vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
}
.lightbox__close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.35);
  background: rgba(0,0,0,0.25);
  color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 1.1rem;
}
.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.35);
  background: rgba(0,0,0,0.25);
  color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
}
.lightbox__prev { left: 1rem; }
.lightbox__next { right: 1rem; }
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 240ms ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
