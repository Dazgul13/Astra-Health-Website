<template>
  <div class="range-boundary" :id="id" :aria-valuemin="min" :aria-valuemax="max" :aria-valuenow="modelValue" role="slider" tabindex="0" @keydown.up.prevent="up" @keydown.right.prevent="up" @keydown.left.prevent="down" @keydown.down.prevent="down">
    <div class="range-boundary__labels">
      <span class="range-boundary__label">{{ minLabel }}</span>
      <span class="range-boundary__label">{{ maxLabel }}</span>
    </div>
    <div class="range-boundary__track" @mousedown.prevent="onTrackMouseDown" @touchstart.prevent="onTrackTouchStart">
      <div class="range-boundary__fill" :style="{ width: pct + '%' }"></div>
      <div class="range-boundary__thumb" :style="{ left: pct + '%' }" aria-hidden="true"></div>
    </div>
    <div class="range-boundary__controls">
      <button class="range-boundary__btn" type="button" aria-label="Decrease" @click="down">−</button>
      <p class="range-boundary__value">{{ formatted }}</p>
      <button class="range-boundary__btn" type="button" aria-label="Increase" @click="up">+</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: '' },
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 12 },
  minLabel: { type: String, default: '0' },
  maxLabel: { type: String, default: '12' },
  formatter: { type: Function, default: v => `${v} months` }
})
const emit = defineEmits(['update:modelValue'])

function up() {
  if (props.modelValue < props.max) emit('update:modelValue', props.modelValue + 1)
}
function down() {
  if (props.modelValue > props.min) emit('update:modelValue', props.modelValue - 1)
}
const pct = computed(() => ((props.modelValue - props.min) / Math.max(1, props.max - props.min)) * 100)
const formatted = computed(() => props.formatter(props.modelValue))

function setByClientX(clientX) {
  const track = document.elementFromPoint(clientX, 0)
  if (!track || !track.closest('.range-boundary__track')) return
  const rect = track.closest('.range-boundary__track').getBoundingClientRect()
  const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  const val = Math.round(props.min + ratio * (props.max - props.min))
  emit('update:modelValue', val)
}

function onTrackMouseDown(e) {
  setByClientX(e.clientX)
  const move = (ev) => setByClientX(ev.clientX)
  const up = () => {
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', up)
  }
  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', up)
}
function onTrackTouchStart(e) {
  if (!e.touches[0]) return
  setByClientX(e.touches[0].clientX)
  const move = (ev) => { if (ev.touches[0]) setByClientX(ev.touches[0].clientX) }
  const end = () => {
    window.removeEventListener('touchmove', move)
    window.removeEventListener('touchend', end)
  }
  window.addEventListener('touchmove', move, { passive: true })
  window.addEventListener('touchend', end)
}
</script>

<style scoped>
.range-boundary {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.range-boundary__labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}
.range-boundary__track {
  position: relative;
  height: 3px;
  background: var(--color-border);
  border-radius: 3px;
  cursor: pointer;
}
.range-boundary__fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: var(--color-text);
  border-radius: 3px;
}
.range-boundary__thumb {
  position: absolute;
  top: 50%;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  transform: translate(-50%, -50%);
  border: 2px solid var(--color-text);
  box-shadow: 0 2px 0 rgba(0,0,0,0.1);
  transition: transform 120ms ease;
}
.range-boundary__track:active .range-boundary__thumb {
  transform: translate(-50%, -50%) scale(1.15);
}
.range-boundary__value {
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
}
.range-boundary__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.range-boundary__btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: #fff;
  cursor: pointer;
  color: var(--color-text);
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  transition: all var(--transition-soft);
}
.range-boundary__btn:hover {
  border-color: var(--color-text);
  background: var(--color-bg-soft);
}
</style>
