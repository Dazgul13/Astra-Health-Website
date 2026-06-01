<template>
  <Transition name="toast">
    <div v-if="visible" class="toast" role="status" aria-live="polite">
      <span class="toast__icon" aria-hidden="true">{{ icon }}</span>
      <span class="toast__message">{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  message: { type: String, default: '' },
  type: { type: String, default: 'success' }
})

const visible = ref(false)
const icon = ref('✓')

watch(() => props.message, (val) => {
  if (!val) return
  visible.value = true
  icon.value = props.type === 'error' ? '!' : '✓'
  setTimeout(() => { visible.value = false }, 4000)
})
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--color-text);
  color: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 40px rgba(0,0,0,0.18);
  font-size: 0.95rem;
  max-width: min(92vw, 420px);
}
.toast__icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  display: grid;
  place-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  flex-shrink: 0;
}
.toast-enter-active,
.toast-leave-active {
  transition: opacity 240ms ease, transform 240ms ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
