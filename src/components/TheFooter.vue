<script setup lang="ts">
import { salon, workingHours } from '../data/salon'
</script>

<template>
  <footer id="kontakt" class="footer">
    <div class="container footer__grid">
      <div class="footer__brand">
        <span class="footer__mark" aria-hidden="true">M</span>
        <span class="footer__name">{{ salon.name }}</span>
      </div>

      <ul class="footer__col">
        <li v-for="entry in workingHours" :key="entry.days">
          <span>{{ entry.days }}</span>
          <span>{{ entry.hours }}</span>
        </li>
      </ul>

      <ul class="footer__col">
        <li>
          <span>Lokacija</span>
          <span>{{ salon.city }}</span>
        </li>
        <li>
          <span>Telefon</span>
          <a :href="`tel:${salon.phoneHref}`">{{ salon.phone }}</a>
        </li>
        <li>
          <span>Instagram</span>
          <a :href="salon.instagramUrl" target="_blank" rel="noopener">{{ salon.instagram }}</a>
        </li>
      </ul>
    </div>

    <div class="container footer__bottom">
      <p>© {{ new Date().getFullYear() }} {{ salon.name }} · demo stranica</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--hairline);
  background: var(--ink-2);
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr 1fr;
  gap: 40px;
  padding-block: clamp(48px, 7vw, 72px);
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer__mark {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--gold-dim);
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-style: italic;
  color: var(--gold-soft);
}

.footer__name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--cream);
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__col li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.footer__col a:hover {
  color: var(--gold-soft);
}

.footer__bottom {
  border-top: 1px solid var(--hairline);
  padding-block: 20px;
  color: var(--text-faint);
  font-size: 0.8rem;
}

@media (max-width: 760px) {
  .footer__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
