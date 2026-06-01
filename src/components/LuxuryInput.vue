<template>
  <label
    class="luxury-input"
    :for="id"
  >
    <span class="luxury-input__label">{{ label }}</span>
    <input
      :id="id"
      class="luxury-input__field"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      autocomplete="off"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </label>
</template>

<script setup>
defineProps({
  id: { type: String, default: '' },
  label: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.luxury-input {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.luxury-input__label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.luxury-input__field {
  width: 100%;
  padding: 0.85rem 1rem;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--color-text);
  transition: border-color var(--transition-soft);
}
.luxury-input__field:focus {
  outline: none;
  border-color: var(--color-focus);
}
</style>
