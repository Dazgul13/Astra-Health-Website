<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-inner">
        <div v-if="showMap" class="site-footer__map">
          <MapModule />
        </div>
        <div class="footer-brand">
          <div class="footer-logo">
            <svg
              class="footer-logo-mark"
              viewBox="0 0 140 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M22.5 2C26.1 2 29 4.9 29 8.5c0 1.2-.3 2.4-.9 3.4 1.5 1.1 2.5 2.9 2.5 4.9 0 3.3-2.7 6-6 6-.3 0-.5-.1-.8-.1-2.6-.4-4.7-2.5-4.9-5.1-.2-2.8 1.7-5.2 4.4-5.6 1.3 0 2.3-.4 2.8-1.3.4.1.8.1 1.3.1 4.4 0 8-3.6 8-8 0-.6-.1-1.2-.2-1.8C33.2 2.2 28 0 22.5 0 12.8 0 5 7.8 5 17.5 5 27.2 12.8 35 22.5 35c3.9 0 7.5-1 10.6-2.8 1.5.6 3.1.9 4.8.9 8.3 0 15-6.7 15-15S38.3 4 30 4c-1.2 0-2.4.2-3.5.5C25.4 2.2 24 2 22.5 2z"
                fill="currentColor"
              />
            </svg>
            <span class="footer-logo-text">AstraHealth</span>
          </div>
          <p class="footer-tagline">Where new life begins with care, dignity, and quiet confidence.</p>
          <address class="footer-address">
            Purok 1, Mabical Highway<br />
            Mabical, Floridablanca, Philippines 2006
          </address>
          <a href="tel:09227406819" class="footer-phone">0922 740 6819</a>
        </div>

        <div class="footer-nav">
          <div class="footer-col">
            <h4 class="footer-col-heading">Contact</h4>
            <ul>
              <li><a href="mailto:astrahealthmed@gmail.com" class="footer-link">astrahealthmed@gmail.com</a></li>
              <li><a href="https://www.facebook.com/astrahealthmed" target="_blank" rel="noopener" class="footer-link">Facebook</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-heading">Quick Links</h4>
            <ul>
              <li><router-link to="/services" class="footer-link">Services</router-link></li>
              <li><router-link to="/gallery" class="footer-link">Gallery</router-link></li>
              <li><router-link to="/team" class="footer-link">Team</router-link></li>
              <li><router-link to="/booking" class="footer-link">Book Consultation</router-link></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-inner">
          <p class="footer-copy">© {{ year }} AstraHealth Birthing Center. All rights reserved.</p>
          <div class="footer-social">
            <a href="https://www.facebook.com/astrahealthmed" target="_blank" rel="noopener" aria-label="Facebook" class="footer-social__link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.06 5.66 21.13 10.44 21.97v-6.98H7.9v-2.92h2.54V9.84c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.92h-2.3V22C18.34 21.13 22 17.06 22 12.07z"/></svg>
            </a>
            <a href="mailto:astrahealthmed@gmail.com" aria-label="Email" class="footer-social__link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
  showMap: { type: Boolean, default: false }
})

const year = computed(() => new Date().getFullYear())
</script>

<style scoped>
.site-footer {
  margin-top: auto;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
  padding: 4rem 0 0;
  color: var(--color-text-secondary);
}
.footer-inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: start;
}
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.footer-logo-mark {
  width: 36px;
  height: 36px;
  color: var(--color-primary);
}
.footer-logo-text {
  font-weight: 300;
  font-size: clamp(1.05rem, 0.9vw + 0.6rem, 1.2rem);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text);
}
.footer-tagline {
  font-size: 0.92rem;
  color: var(--color-text-muted);
  max-width: 38ch;
  line-height: 1.55;
}
.footer-address {
  font-style: normal;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}
.footer-phone {
  font-size: 0.95rem;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.02em;
}
.footer-nav {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}
.footer-col-heading {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 0.9rem;
}
.footer-col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.footer-link {
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 220ms ease;
}
.footer-link:hover {
  color: var(--color-text);
}
.footer-bottom {
  margin-top: 3rem;
  border-top: 1px solid var(--color-border);
  padding: 1.25rem 0;
}
.footer-bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.footer-copy {
  font-size: 0.82rem;
  color: var(--color-text-muted);
}
.footer-social {
  display: flex;
  gap: 0.75rem;
}
.footer-social__link {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  transition: color 220ms ease, border-color 220ms ease, background 220ms ease;
}
.footer-social__link:hover {
  color: var(--color-text);
  border-color: var(--color-text);
  background: var(--color-bg-soft);
}

@media (max-width: 760px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .footer-nav {
    grid-template-columns: 1fr;
  }
  .footer-bottom-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>
