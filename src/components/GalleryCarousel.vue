<template>
  <div class="gallery-carousel" aria-label="Image carousel">
    <div
      class="gallery-carousel__back"
      role="button"
      tabindex="0"
      aria-label="Go back"
      @click="goBack"
    >← Back</div>
    <div class="gallery-carousel__viewport">
      <div class="gallery-carousel__track" ref="track">
        <div
          v-for="(img, i) in images"
          :key="img.src + '-' + i"
          class="gallery-carousel__slide"
          tabindex="0"
          role="button"
          aria-label="Open larger view"
          @click="select(i)"
          @keydown.enter="select(i)"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            loading="lazy"
          />
        </div>
      </div>
    </div>
    <div class="gallery-carousel__controls">
      <button class="gallery-carousel__btn" aria-label="Previous" @click="prev">←</button>
      <span class="gallery-carousel__dot">{{ currentIndex + 1 }} / {{ images.length }}</span>
      <button class="gallery-carousel__btn" aria-label="Next" @click="next">→</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  images: { type: Array, required: true }
})
const emit = defineEmits(['select', 'back'])

const track = ref(null)
const currentIndex = ref(0)
let tween = null
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function updatePosition(animate = true) {
  if (!track.value) return
  const slide = track.value.querySelector('.gallery-carousel__slide')
  if (!slide) return
  const offset = currentIndex.value * (slide.offsetWidth + 20)
  if (!animate || reducedMotion) {
    gsap.set(track.value, { x: -offset })
  } else {
    gsap.to(track.value, { x: -offset, duration: 0.7, ease: 'power3.out' })
  }
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
  updatePosition()
}
function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
  updatePosition()
}
function select(i) {
  emit('select', i)
}
function goBack() {
  emit('back')
}

watch(() => props.images, () => {
  currentIndex.value = 0
  setTimeout(updatePosition, 50)
})

onMounted(() => {
  updatePosition(false)
})

onBeforeUnmount(() => {
  if (tween) tween.kill()
})

defineExpose({ leave: () => { if (tween) tween.kill() } })
</script>

<style scoped>
.gallery-carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.gallery-carousel__back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.4rem 0;
  margin-bottom: 0.75rem;
  transition: color var(--transition-soft);
}
.gallery-carousel__back:hover {
  color: var(--color-text);
}
.gallery-carousel__viewport {
  overflow: hidden;
}
.gallery-carousel__track {
  display: flex;
  gap: 20px;
  will-change: transform;
}
.gallery-carousel__slide {
  flex: 0 0 clamp(260px, 38vw, 380px);
  cursor: pointer;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  transition: transform var(--transition-soft), border-color var(--transition-soft);
}
.gallery-carousel__slide:hover {
  transform: translateY(-3px);
  border-color: var(--color-text);
}
.gallery-carousel__slide img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  display: block;
}
.gallery-carousel__controls {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-top: 1.5rem;
}
.gallery-carousel__btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: transparent;
  cursor: pointer;
  color: var(--color-text);
  display: grid;
  place-items: center;
  transition: all var(--transition-soft);
}
.gallery-carousel__btn:hover {
  border-color: var(--color-text);
}
.gallery-carousel__dot {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  min-width: 30px;
  text-align: center;
}
</style>
