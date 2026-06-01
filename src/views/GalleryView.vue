<template>
  <section class="gallery">
    <section class="gallery__hero section">
      <div class="container">
        <h1 data-reveal>
          Gallery
        </h1>
        <p data-reveal>
          Explore our facility and the families we serve.
        </p>
      </div>
    </section>

    <section class="gallery__hub section">
      <div class="container">
        <div class="gallery__carousel" @mouseenter="pauseOuter" @mouseleave="resumeOuter">
          <div class="gallery__track" ref="trackRef">
            <router-link
              v-for="(album, i) in albums"
              :key="album.key"
              :to="album.to"
              class="gallery__card"
              @mouseenter="stopAutoPlay(i)"
              @mouseleave="startAutoPlay(i, album.images.length)"
            >
              <!-- Album slideshow -->
              <div class="gallery__album">
                <div
                  v-for="(img, pi) in album.images"
                  :key="pi"
                  class="gallery__album__slide"
                  :class="{ active: activePhoto[i] === pi }"
                >
                  <img
                    :src="img.src"
                    :alt="img.alt"
                    loading="lazy"
                  />
                </div>
              </div>
              <div class="gallery__card__overlay"></div>

              <!-- Arrows -->
              <button
                class="gallery__album__arrow gallery__album__arrow--prev"
                type="button"
                @click="prevPhoto(i, album.images.length, $event)"
                :aria-label="'Previous photo of ' + album.title"
              >&#8249;</button>
              <button
                class="gallery__album__arrow gallery__album__arrow--next"
                type="button"
                @click="nextPhoto(i, album.images.length, $event)"
                :aria-label="'Next photo of ' + album.title"
              >&#8250;</button>

              <!-- Dots -->
              <div class="gallery__album__dots">
                <button
                  v-for="(_, pi) in album.images"
                  :key="pi"
                  type="button"
                  class="gallery__album__dot"
                  :class="{ active: activePhoto[i] === pi }"
                  @click="goToPhoto(i, pi, album.images.length, $event)"
                  :aria-label="'Photo ' + (pi + 1)"
                ></button>
              </div>

              <!-- Caption -->
              <div class="gallery__card__body">
                <span class="gallery__card__title">{{ album.title }}</span>
                <span class="gallery__card__meta">{{ album.meta }}</span>
                <span class="gallery__card__counter">{{ activePhoto[i] + 1 }} / {{ album.images.length }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const albums = [
  {
    key: 'facility',
    to: '/gallery/facility',
    title: 'Facility Gallery',
    meta: 'Delivery suites, nursery & amenities',
    images: [
      { src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80', alt: 'Private birthing suite' },
      { src: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&q=80', alt: 'Modern delivery room' },
      { src: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=900&q=80', alt: 'Premium amenities' }
    ]
  },
  {
    key: 'patients',
    to: '/gallery/patients',
    title: 'Patient Gallery',
    meta: 'Our happy families & celebrations',
    images: [
      { src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=900&q=80', alt: 'Happy family portrait' },
      { src: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=900&q=80', alt: 'New parents with baby' },
      { src: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=900&q=80', alt: 'Family celebration' }
    ]
  }
]

const trackRef = ref(null)
const activePhoto = reactive({})
const intervals = new Map()
let outerAnim = null

function startAutoPlay(cardIdx, total) {
  if (intervals.has(cardIdx)) return
  const id = setInterval(() => {
    activePhoto[cardIdx] = (activePhoto[cardIdx] + 1) % total
  }, 2500)
  intervals.set(cardIdx, id)
}
function stopAutoPlay(cardIdx) {
  const id = intervals.get(cardIdx)
  if (id !== undefined) {
    clearInterval(id)
    intervals.delete(cardIdx)
  }
}
function restartAutoPlay(cardIdx, total) {
  stopAutoPlay(cardIdx)
  startAutoPlay(cardIdx, total)
}
function prevPhoto(cardIdx, total, e) {
  e.stopPropagation()
  e.preventDefault()
  activePhoto[cardIdx] = (activePhoto[cardIdx] - 1 + total) % total
  restartAutoPlay(cardIdx, total)
}
function nextPhoto(cardIdx, total, e) {
  e.stopPropagation()
  e.preventDefault()
  activePhoto[cardIdx] = (activePhoto[cardIdx] + 1) % total
  restartAutoPlay(cardIdx, total)
}
function goToPhoto(cardIdx, photoIdx, total, e) {
  e.stopPropagation()
  e.preventDefault()
  activePhoto[cardIdx] = photoIdx
  restartAutoPlay(cardIdx, total)
}

function pauseOuter() {
  if (trackRef.value) trackRef.value.style.animationPlayState = 'paused'
}
function resumeOuter() {
  if (trackRef.value) trackRef.value.style.animationPlayState = 'running'
}

albums.forEach((_, i) => { activePhoto[i] = 0 })

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return

  albums.forEach((a, i) => startAutoPlay(i, a.images.length))

  gsap.fromTo(
    '.gallery__card',
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.gallery__hub',
        start: 'top 78%'
      }
    }
  )
})

onBeforeUnmount(() => {
  intervals.forEach((id) => clearInterval(id))
  intervals.clear()
  if (outerAnim) outerAnim.kill()
})

defineExpose({ leave: () => ScrollTrigger.getAll().forEach((t) => t.kill()) })
</script>

<style scoped>
.gallery__hero {
  padding: calc(var(--header-height) + 4rem) 0 2rem;
  background: var(--color-bg);
}
.gallery__hub {
  padding: 2rem 0 6rem;
  background: var(--color-bg-soft);
}
.gallery__hero h1 {
  margin-bottom: 0.6rem;
}

/* Carousel wrapper */
.gallery__carousel {
  overflow: hidden;
  margin-top: 2.5rem;
}
.gallery__track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(320px, 1fr);
  gap: 1.5rem;
  will-change: transform;
}

/* Cards */
.gallery__card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 0.75rem;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: inherit;
  transition: transform var(--transition-soft), border-color var(--transition-soft);
}
.gallery__card:hover {
  transform: translateY(-3px);
  border-color: var(--color-text);
}

/* Album slideshow */
.gallery__album {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-bg-cream);
}
.gallery__album__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 520ms ease;
}
.gallery__album__slide.active {
  opacity: 1;
}
.gallery__album__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.gallery__card__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.35) 100%);
  border-radius: var(--radius-md);
}

/* Arrows */
.gallery__album__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.4);
  background: rgba(0,0,0,0.25);
  color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 1.1rem;
  z-index: 3;
  transition: background var(--transition-soft);
}
.gallery__album__arrow:hover {
  background: rgba(0,0,0,0.45);
}
.gallery__album__arrow--prev { left: 0.75rem; }
.gallery__album__arrow--next { right: 0.75rem; }

/* Dots */
.gallery__album__dots {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.4rem;
  z-index: 3;
}
.gallery__album__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform var(--transition-soft), background var(--transition-soft);
}
.gallery__album__dot.active {
  background: #fff;
  transform: scale(1.25);
}

/* Caption */
.gallery__card__body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0 0.25rem;
}
.gallery__card__title {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--color-text);
}
.gallery__card__meta {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
.gallery__card__counter {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  letter-spacing: 0.06em;
}

@media (max-width: 640px) {
  .gallery__track {
    grid-auto-columns: 85vw;
    gap: 1rem;
  }
}
</style>
