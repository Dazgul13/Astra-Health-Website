<template>
  <section class="team">
    <section class="team__hero section">
      <div class="container">
        <h1 data-reveal>
          Meet Our Team
        </h1>
        <p data-reveal>
          Compassionate clinicians devoted to your birthing journey.
        </p>
      </div>
    </section>

    <section class="team__grid section">
      <div class="container">
        <div
          v-for="(member) in team"
          :key="member.name"
          class="team__member"
          data-reveal
        >
          <div class="team__portrait">
            <img
              :src="member.image"
              :alt="member.name"
              loading="lazy"
            >
          </div>
          <div class="team__details">
            <h2 class="team__name">
              {{ member.name }}
            </h2>
            <p class="team__role">
              {{ member.role }}
            </p>
            <p class="team__bio">
              {{ member.bio }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const team = [
  {
    name: 'Dr. Maria Santos',
    role: 'Obstetrician-Gynecologist',
    bio: 'Board-certified OB-GYN with over 15 years of experience in high-risk pregnancies and natural birthing methods. She leads our clinical protocols with precision and calm.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80'
  },
  {
    name: 'Dr. James Reyes',
    role: 'Neonatologist',
    bio: 'Specializes in newborn critical care and neonatal transition. His meticulous approach ensures every baby receives immediate, expert attention at birth.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80'
  },
  {
    name: 'Nurse Ana Cruz, RN',
    role: 'Head Midwife & Prenatal Coordinator',
    bio: 'With a gentle touch and 12 years of midwifery practice, Nurse Ana guides patients through prenatal classes, labor support, and post-natal recovery.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80'
  },
  {
    name: 'Dr. Elisa Mendoza',
    role: 'Anesthesiologist',
    bio: 'Expert in pain management and epidural analgesia, Dr. Mendoza ensures every patient’s comfort and safety during labor and delivery.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80'
  }
]

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return
  gsap.fromTo(
    '.team__member',
    { opacity: 0, y: 28 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.team__grid',
        start: 'top 78%'
      }
    }
  )
})

defineExpose({ leave: () => ScrollTrigger.getAll().forEach((t) => t.kill()) })
</script>

<style scoped>
.team__hero {
  padding: calc(var(--header-height) + 4rem) 0 2rem;
  background: var(--color-bg);
}
.team__grid {
  padding: 2rem 0 6rem;
  background: var(--color-bg-soft);
}
.team__hero h1 {
  margin-bottom: 0.6rem;
}
.team__member {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 2.5rem;
  align-items: center;
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--color-border);
}
.team__member:last-child {
  border-bottom: none;
}
.team__portrait {
  aspect-ratio: 4/5;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-white);
  border: 1px solid var(--color-border);
}
.team__portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 500ms ease;
}
.team__member:hover .team__portrait img {
  transform: scale(1.03);
}
.team__name {
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: 0.3rem;
}
.team__role {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}
.team__bio {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 60ch;
}
@media (max-width: 720px) {
  .team__member {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .team__portrait {
    aspect-ratio: 1/1;
    max-width: 320px;
  }
}
</style>
