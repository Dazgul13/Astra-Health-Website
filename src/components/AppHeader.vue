<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <router-link
        to="/"
        class="site-header__brand"
        aria-label="AstraHealth Home"
        @click="scrollToTop"
      >
        <svg
          class="site-header__logo"
          viewBox="0 0 140 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M22.5 2C26.1 2 29 4.9 29 8.5c0 1.2-.3 2.4-.9 3.4 1.5 1.1 2.5 2.9 2.5 4.9 0 3.3-2.7 6-6 6-.3 0-.5-.1-.8-.1-2.6-.4-4.7-2.5-4.9-5.1-.2-2.8 1.7-5.2 4.4-5.6 1.3 0 2.3-.4 2.8-1.3.4.1.8.1 1.3.1 4.4 0 8-3.6 8-8 0-.6-.1-1.2-.2-1.8C33.2 2.2 28 0 22.5 0 12.8 0 5 7.8 5 17.5 5 27.2 12.8 35 22.5 35c3.9 0 7.5-1 10.6-2.8 1.5.6 3.1.9 4.8.9 8.3 0 15-6.7 15-15S38.3 4 30 4c-1.2 0-2.4.2-3.5.5C25.4 2.2 24 2 22.5 2z"
            fill="#5b7d8a"
          />
        </svg>
        <span class="site-header__wordmark">AstraHealth</span>
      </router-link>

      <nav class="site-header__nav" aria-label="Primary">
        <router-link
          to="/"
          class="site-header__link"
          exact-active-class="is-active"
          @click="closeMenu"
        >
          Home
        </router-link>
        <router-link
          to="/services"
          class="site-header__link"
          active-class="is-active"
          @click="closeMenu"
        >
          Services
        </router-link>
        <router-link
          to="/gallery"
          class="site-header__link"
          active-class="is-active"
          @click="closeMenu"
        >
          Gallery
        </router-link>
        <router-link
          to="/team"
          class="site-header__link"
          active-class="is-active"
          @click="closeMenu"
        >
          Team
        </router-link>
      </nav>

      <router-link
        to="/booking"
        class="btn btn-outline site-header__cta"
        aria-label="Book Consultation"
        @click="closeMenu"
      >
        Book Consultation
      </router-link>

      <div
        class="hamburger"
        :class="{ 'is-active': isMenuOpen }"
        @click="toggleMenu"
        aria-label="Toggle navigation"
        role="button"
        tabindex="0"
        @keydown.enter="toggleMenu"
      >
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="isMenuOpen"
        class="mobile-menu-overlay"
        @click="closeMenu"
      >
        <nav
          class="mobile-menu"
          aria-label="Mobile Primary"
          @click.stop
        >
          <button
            class="mobile-close"
            @click="closeMenu"
            aria-label="Close menu"
          >×</button>
          <router-link
            to="/"
            class="nav-link"
            active-class="is-active"
            exact-active-class="is-active"
            @click="closeMenu"
          >
            Home
          </router-link>
          <router-link
            to="/services"
            class="nav-link"
            active-class="is-active"
            @click="closeMenu"
          >
            Services
          </router-link>
          <router-link
            to="/gallery"
            class="nav-link"
            active-class="is-active"
            @click="closeMenu"
          >
            Gallery
          </router-link>
          <router-link
            to="/team"
            class="nav-link"
            active-class="is-active"
            @click="closeMenu"
          >
            Team
          </router-link>
          <router-link
            to="/booking"
            class="nav-link"
            active-class="is-active"
            @click="closeMenu"
          >
            Book Consultation
          </router-link>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
function closeMenu() {
  isMenuOpen.value = false
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function updateScroll() {
  isScrolled.value = window.scrollY > 80
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll)
  updateScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(140%) blur(14px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  transition: background-color 0.3s ease;
}
.site-header.scrolled {
  background: rgba(255, 255, 255, 0.95);
}
.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  position: relative;
}
.site-header__brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--color-text);
}
.site-header__logo {
  width: 90px;
  height: auto;
}
.site-header__wordmark {
  font-weight: 300;
  font-size: clamp(1.1rem, 1vw + 0.5rem, 1.3rem);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.site-header__nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}
.site-header__link {
  position: relative;
  font-size: 0.92rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--color-text-secondary);
  padding: 0.25rem 0;
  transition: color var(--transition-soft);
}
.site-header__link:hover {
  color: var(--color-text);
}
.site-header__link.is-active {
  color: var(--color-text);
  font-weight: 500;
}
.site-header__link.is-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1.5px;
  background: var(--color-text);
  border-radius: 2px;
}
.site-header__cta {
  font-weight: 400;
  letter-spacing: 0.03em;
}
.hamburger {
  display: none;
  flex-direction: column;
  gap: 0.35rem;
  cursor: pointer;
  z-index: 1001;
  padding: 0.5rem;
}
.bar {
  width: 1.5rem;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Mobile menu overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(17, 17, 17, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
  padding: 2rem;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  max-height: 85vh;
  overflow-y: auto;
  width: min(92vw, 420px);
  position: relative;
}
.mobile-close {
  position: static;
  align-self: flex-end;
  background: transparent;
  border: none;
  color: var(--color-text);
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  transition: background var(--transition-soft);
  margin-bottom: 0.5rem;
}
.mobile-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  color: var(--color-text);
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1002;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  transition: background var(--transition-soft);
}
.mobile-close:hover {
  background: var(--color-bg-soft);
}
.mobile-menu .nav-link {
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--color-text);
  letter-spacing: 0.02em;
}
.mobile-menu .nav-link.is-active {
  font-weight: 500;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Solid background on mobile - always */
@media (max-width: 780px) {
  .site-header {
    background: var(--color-white) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
  .site-header.scrolled {
    background: var(--color-white) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
  .site-header__nav {
    display: none;
  }
  .site-header__cta {
    display: none;
  }
  .hamburger {
    display: flex;
  }
}
</style>
