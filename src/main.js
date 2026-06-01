import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import ServicesView from './views/ServicesView.vue'
import GalleryView from './views/GalleryView.vue'
import FacilityGalleryView from './views/FacilityGalleryView.vue'
import PatientGalleryView from './views/PatientGalleryView.vue'
import TeamView from './views/TeamView.vue'
import BookingView from './views/BookingView.vue'
import BookingConfirmationView from './views/BookingConfirmationView.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/services', name: 'services', component: ServicesView },
    { path: '/gallery', name: 'gallery', component: GalleryView },
    { path: '/gallery/facility', name: 'gallery-facility', component: FacilityGalleryView },
    { path: '/gallery/patients', name: 'gallery-patients', component: PatientGalleryView },
    { path: '/team', name: 'team', component: TeamView },
    { path: '/booking', name: 'booking', component: BookingView },
    { path: '/booking/confirmation', name: 'booking-confirmation', component: BookingConfirmationView }
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
