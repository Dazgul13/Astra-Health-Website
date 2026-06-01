<template>
  <button
    class="go-back"
    type="button"
    aria-label="Go back"
    @click="navigate"
  >
    <span aria-hidden="true">←</span>
    <span>&nbsp;Back</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const canGoBack = computed(() => window.history.length > 1)

function navigate() {
  if (canGoBack.value) router.back()
  else router.push('/')
}
</script>

<style scoped>
.go-back {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-sans);
  font-size: 0.92rem;
  line-height: 1;
  color: var(--color-text-secondary);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 0.5rem 0.6rem;
  border-radius: 999px;
  transition: color 220ms ease, border-color 220ms ease, background 220ms ease;
}
.go-back:hover {
  color: var(--color-text);
  border-color: var(--color-border);
  background: var(--color-bg-soft);
}
.go-back[aria-disabled='true'] {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
