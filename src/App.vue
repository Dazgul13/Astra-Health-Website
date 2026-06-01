<template>
  <AppHeader />
  <main id="main-content">
    <router-view v-slot="{ Component, route }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </main>
  <AppFooter />
  <Toast :message="toast.message" :type="toast.type" />
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import Toast from './components/Toast.vue'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()
const toast = reactive({ message: '', type: 'success' })

function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}

router.beforeEach(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})

router.afterEach(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  setTimeout(() => ScrollTrigger.refresh(), 60)
})

onMounted(initLenis)

defineExpose({ toast })
</script>

<style scoped>
</style>
