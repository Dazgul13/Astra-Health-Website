<template>
  <section
    class="fb-carousel"
    aria-label="Facebook Reviews"
  >
    <div class="fb-carousel__viewport">
      <div
        ref="track"
        class="fb-carousel__track"
      >
        <div
          v-for="(review, index) in reviews"
          :key="review.id + '-' + index"
          class="fb-carousel__slide"
          tabindex="0"
        >
          <div class="fb-carousel__author">
            <div
              class="fb-carousel__avatar"
              aria-hidden="true"
            >
              {{ review.initials }}
            </div>
            <div>
              <p class="fb-carousel__name">
                {{ review.name }}
              </p>
              <p class="fb-carousel__meta">
                Verified on Facebook
              </p>
            </div>
            <a
              class="fb-carousel__fb"
              :href="review.fbLink"
              target="_blank"
              rel="noopener"
              aria-label="View on Facebook"
            >
              <span class="fb-carousel__fb-mark">f</span>
            </a>
          </div>
          <div
            class="fb-carousel__stars"
            aria-label="5 out of 5 stars"
          >
            <span
              v-for="s in 5"
              :key="s"
              class="star"
            >★</span>
          </div>
          <p class="fb-carousel__text">
            “{{ review.text }}”
          </p>
        </div>
      </div>
    </div>
    <div class="fb-carousel__controls">
      <button
        class="fb-carousel__btn"
        aria-label="Slower"
        @click="slow"
      >
        ←
      </button>
      <span class="fb-carousel__dot">Live</span>
      <button
        class="fb-carousel__btn"
        aria-label="Faster"
        @click="fast"
      >
        →
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const reviews = [
  {
    id: 1,
    name: 'Megan R.',
    initials: 'MR',
    text: 'The most compassionate birthing experience we could have asked for. Every detail was handled with warmth and professionalism.',
    fbLink: 'https://www.facebook.com/astrahealthmed'
  },
  {
    id: 2,
    name: 'Katherine L.',
    initials: 'KL',
    text: 'From the first consultation to the delivery, AstraHealth made us feel safe and truly cared for.',
    fbLink: 'https://www.facebook.com/astrahealthmed'
  },
  {
    id: 3,
    name: 'Alicia S.',
    initials: 'AS',
    text: 'Elegant suites, attentive staff, and a birth plan that felt perfectly tailored to us.',
    fbLink: 'https://www.facebook.com/astrahealthmed'
  },
  {
    id: 4,
    name: 'Patricia D.',
    initials: 'PD',
    text: 'Our newborn was welcomed with such tenderness. Forever grateful to the AstraHealth team.',
    fbLink: 'https://www.facebook.com/astrahealthmed'
  }
]

const track = ref(null)
let tween
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function start() {
  if (!track.value) return
  track.value.innerHTML += track.value.innerHTML
  tween = gsap.to(track.value, {
    xPercent: -50,
    duration: 28,
    repeat: -1,
    ease: 'none'
  })
}
function stop() {
  if (tween) tween.kill()
}
function slow() {
  if (tween) tween.timeScale(0.7)
}
function fast() {
  if (tween) tween.timeScale(1.4)
}

onMounted(() => {
  if (!reducedMotion) start()
})

onBeforeUnmount(stop)

defineExpose({ leave: stop })
</script>

<style scoped>
.fb-carousel {
  width: 100%;
  overflow: hidden;
  padding: 1rem 0;
}
.fb-carousel__viewport {
  overflow: hidden;
}
.fb-carousel__track {
  display: flex;
  gap: 24px;
  width: max-content;
  will-change: transform;
}
.fb-carousel__slide {
  flex: 0 0 clamp(280px, 38vw, 420px);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.fb-carousel__author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.fb-carousel__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-bg-cream);
  display: grid;
  place-items: center;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
}
.fb-carousel__name {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text);
}
.fb-carousel__meta {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}
.fb-carousel__fb {
  margin-left: auto;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #1877f2;
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
}
.fb-carousel__fb-mark {
  line-height: 1;
}
.fb-carousel__stars {
  color: #b5904b;
  font-size: 1rem;
  letter-spacing: 0.1em;
}
.fb-carousel__text {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}
.fb-carousel__controls {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-top: 1.5rem;
}
.fb-carousel__btn {
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
.fb-carousel__btn:hover {
  border-color: var(--color-text);
}
.fb-carousel__dot {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  min-width: 30px;
  text-align: center;
}
</style>
