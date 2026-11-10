<script setup lang="ts">
interface Feature {
  title: string
  text: string
  icon: 'calendar' | 'drop' | 'spark' | 'heart'
}

const features: Feature[] = [
  {
    icon: 'calendar',
    title: 'Rezervacija bez zvanja',
    text: 'Odaberi uslugu i termin online, potvrda stiže odmah.',
  },
  {
    icon: 'drop',
    title: 'Keune proizvodi',
    text: 'Boja i njega profesionalnim Keune linijama.',
  },
  {
    icon: 'spark',
    title: 'Pristup po mjeri',
    text: 'Svaka usluga kreće razgovorom, ne šablonom.',
  },
  {
    icon: 'heart',
    title: 'Salon u srcu Pule',
    text: 'Miran prostor u kojem se termini ne žure.',
  },
]
</script>

<template>
  <section class="section why">
    <div class="container why__grid">
      <article v-for="f in features" :key="f.title" class="why__item">
        <span class="why__icon" aria-hidden="true">
          <svg v-if="f.icon === 'calendar'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.3">
            <rect x="3.5" y="5" width="17" height="15" rx="2" />
            <path d="M3.5 9.5h17M8 3v4M16 3v4" />
          </svg>
          <svg v-else-if="f.icon === 'drop'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.3">
            <path d="M12 3c4 4.8 6.2 8.1 6.2 11a6.2 6.2 0 0 1-12.4 0C5.8 11.1 8 7.8 12 3Z" />
          </svg>
          <svg v-else-if="f.icon === 'spark'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.3">
            <path d="M12 3v4M12 17v4M4.2 12H2M22 12h-2.2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
            <circle cx="12" cy="12" r="3.4" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.3">
            <path d="M12 20s-7-4.6-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 5c-2.3 4.4-9.3 9-9.3 9Z" />
          </svg>
        </span>
        <h3>{{ f.title }}</h3>
        <p>{{ f.text }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.why__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(24px, 4vw, 40px);
}

.why__item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid var(--hairline);
}

.why__icon {
  color: var(--gold-soft);
  margin-bottom: 2px;
}

.why__item h3 {
  font-size: 1.02rem;
}

.why__item p {
  color: var(--text-muted);
  font-size: 0.88rem;
}

@media (max-width: 760px) {
  .why__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .why__grid {
    grid-template-columns: 1fr;
  }
}
</style>
