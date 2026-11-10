<script setup lang="ts">
interface Review {
  text: string
  author: string
  service: string
}

const reviews: Review[] = [
  {
    text: 'Prvi put da mi je netko objasnio zašto baš ta nijansa paše mojoj koži, ne samo da mi lijepo stoji.',
    author: 'K.',
    service: 'Pramenovi',
  },
  {
    text: 'Salon miriše na red i mir — nema žurbe, nema pet ljudi odjednom.',
    author: 'A.',
    service: 'Žensko šišanje',
  },
  {
    text: 'Online rezervacija mi je spasila jutro — termin u pauzi za ručak, bez čekanja na poruku.',
    author: 'I.',
    service: 'Keune njega',
  },
  {
    text: 'Rez drži oblik tjednima poslije, ne samo prvi dan nakon frizera.',
    author: 'D.',
    service: 'Žensko šišanje',
  },
]
</script>

<template>
  <section id="dojmovi" class="section quote">
    <div class="container">
      <h2>Dojmovi</h2>
      <ul class="quote__list">
        <li v-for="r in reviews" :key="r.author + r.service">
          <blockquote>{{ r.text }}</blockquote>
          <p class="quote__by">{{ r.author }} · {{ r.service }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.quote h2 {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  margin-bottom: 36px;
}

.quote__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--hairline);
  border: 1px solid var(--hairline);
}

.quote__list li {
  background: var(--ink);
  padding: 30px clamp(20px, 3vw, 32px);
}

.quote blockquote {
  margin: 0;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--cream);
  line-height: 1.4;
}

.quote__by {
  margin-top: 16px;
  color: var(--text-faint);
  font-size: 0.84rem;
}

@media (max-width: 700px) {
  .quote__list {
    grid-template-columns: 1fr;
  }
}
</style>
