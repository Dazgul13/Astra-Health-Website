<template>
  <div
    class="luxury-select"
    role="listbox"
    :aria-label="label"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="luxury-select__option"
      :class="['luxury-select__option', { 'is-selected': modelValue === option.value }]"
      role="option"
      :aria-selected="modelValue === option.value"
      @click="emit('update:modelValue', option.value)"
    >
      <span class="luxury-select__value">{{ option.label }}</span>
      <span
        v-if="option.desc"
        class="luxury-select__desc"
      >{{ option.desc }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  options: { type: Array, required: true },
  modelValue: { type: [String, Number], required: true },
  label: { type: String, default: 'Options' }
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.luxury-select {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.luxury-select__option {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  transition: all var(--transition-soft);
}
.luxury-select__option:hover {
  border-color: var(--color-text);
}
.luxury-select__option.is-selected {
  border-color: var(--color-text);
  background: var(--color-bg-soft);
}
.luxury-select__value {
  font-weight: 500;
  font-size: 1rem;
  color: var(--color-text);
}
.luxury-select__desc {
  font-size: 0.88rem;
  color: var(--color-text-muted);
}
</style>
