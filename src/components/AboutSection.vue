<script setup lang="ts">
import { salon } from '../data/salon'
</script>

<template>
  <section id="o-nama" class="about">
    <div class="container about__inner">
      <p class="about__number">{{ salon.followers }}</p>
      <p class="about__line">
        Jedna frizerka, jedan klijent u isto vrijeme — zato {{ salon.followers }} pratitelja na Instagramu ovdje
        dogovara termin.
      </p>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding-block: clamp(48px, 7vw, 80px);
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
}

.about__inner {
  display: flex;
  align-items: baseline;
  gap: clamp(20px, 4vw, 40px);
  flex-wrap: wrap;
}

.about__number {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 4.5rem);
  color: var(--gold-soft);
  flex-shrink: 0;
}

.about__line {
  max-width: 46ch;
  color: var(--text-muted);
  font-size: 1.05rem;
}
</style>
