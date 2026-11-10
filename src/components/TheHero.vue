<script setup lang="ts">
import { salon, workingHours } from '../data/salon'
import { useBooking } from '../composables/useBooking'

const { openBooking } = useBooking()

const scheduleLine = workingHours.map((w) => `${w.days.split(',')[0]} ${w.hours}`).join('  ·  ')
</script>

<template>
  <section class="hero">
    <span class="hero__mark" aria-hidden="true">M</span>

    <div class="container hero__inner">
      <h1>Rez i boja,<br />bez žurbe.</h1>
      <p class="hero__lead">Keune njega i termin koji biraš sam — bez čekanja na poruku.</p>

      <div class="hero__actions">
        <button class="btn btn-primary" @click="openBooking()">Rezerviraj termin</button>
        <a class="text-link" href="#usluge">Pogledaj cjenik</a>
      </div>
    </div>

    <div class="container hero__foot">
      <p>{{ scheduleLine }}</p>
      <p>{{ salon.city }}</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding-block: 120px 32px;
}

.hero__mark {
  position: absolute;
  right: clamp(-60px, 4vw, 20px);
  top: 50%;
  transform: translateY(-54%);
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(320px, 42vw, 620px);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px var(--gold-dim);
  pointer-events: none;
  user-select: none;
}

.hero__inner h1 {
  font-size: clamp(2.8rem, 7vw, 5.2rem);
  max-width: 11ch;
}

.hero__lead {
  margin-top: 24px;
  max-width: 38ch;
  color: var(--text-muted);
  font-size: 1.1rem;
}

.hero__actions {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.hero__foot {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 96px;
  padding-top: 20px;
  border-top: 1px solid var(--hairline);
  color: var(--text-faint);
  font-size: 0.86rem;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .hero {
    min-height: auto;
    padding-top: 96px;
  }

  .hero__mark {
    font-size: 260px;
    top: 30%;
  }

  .hero__foot {
    flex-direction: column;
    gap: 6px;
    margin-top: 64px;
  }
}
</style>
