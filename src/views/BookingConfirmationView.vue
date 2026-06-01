<template>
  <section class="confirmation">
    <div class="container">
      <div class="confirmation__card">
        <div class="confirmation__icon" aria-hidden="true">✓</div>
        <h1>Booking Confirmed</h1>
        <p class="confirmation__sub">Thank you for choosing AstraHealth. Your pre-admission configuration has been received.</p>
        <div class="confirmation__number">
          <span class="confirmation__label">Booking Number</span>
          <span class="confirmation__value">{{ bookingNumber }}</span>
        </div>
        <p class="confirmation__note">Please save this number for your records. Our team will contact you shortly to finalize your appointment.</p>
        <router-link to="/" class="btn btn-primary">Return Home</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const bookingNumber = computed(() => route.query.bookingNumber || 'N/A')
</script>

<style scoped>
.confirmation {
  padding: calc(var(--header-height) + 6rem) 0 6rem;
  background: var(--color-bg);
}
.confirmation__card {
  max-width: 640px;
  margin: 0 auto;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}
.confirmation__icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-secondary-soft);
  color: var(--color-secondary);
  display: grid;
  place-items: center;
  font-size: 1.6rem;
  font-weight: 600;
}
.confirmation__card h1 {
  font-size: clamp(1.6rem, 2vw + 0.8rem, 2.2rem);
  font-weight: 400;
  color: var(--color-text);
}
.confirmation__sub {
  font-size: 1rem;
  color: var(--color-text-secondary);
  max-width: 52ch;
  line-height: 1.6;
}
.confirmation__number {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1rem 1.5rem;
  background: var(--color-bg-soft);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  min-width: 240px;
}
.confirmation__label {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
}
.confirmation__value {
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-text);
  letter-spacing: 0.04em;
}
.confirmation__note {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 58ch;
}
</style>
