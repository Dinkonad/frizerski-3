<script setup lang="ts">
import { ref, computed } from 'vue'
import { serviceCategories, type Service } from '../data/salon'
import { useBooking } from '../composables/useBooking'

const { openBooking } = useBooking()
const activeCategoryId = ref(serviceCategories[0].id)

const activeCategory = computed(
  () => serviceCategories.find((c) => c.id === activeCategoryId.value) ?? serviceCategories[0],
)

function pick(service: Service) {
  openBooking(service)
}
</script>

<template>
  <section id="usluge" class="section services">
    <div class="container">
      <h2>Usluge</h2>

      <div class="services__tabs" role="tablist">
        <button
          v-for="cat in serviceCategories"
          :key="cat.id"
          role="tab"
          :aria-selected="cat.id === activeCategoryId"
          class="services__tab"
          :class="{ 'is-active': cat.id === activeCategoryId }"
          @click="activeCategoryId = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <ul class="services__list">
        <li v-for="service in activeCategory.services" :key="service.id">
          <button class="services__row" @click="pick(service)">
            <span class="services__name">{{ service.name }}</span>
            <span class="services__duration">{{ service.duration }}</span>
            <span class="services__price">{{ service.price }}</span>
            <svg class="services__chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.4">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.services h2 {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  margin-bottom: 32px;
}

.services__tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.services__tab {
  background: transparent;
  border: 1px solid var(--hairline);
  color: var(--text-muted);
  padding: 9px 18px;
  border-radius: 999px;
  font-size: 0.86rem;
  transition: all 0.2s ease;
}

.services__tab.is-active {
  border-color: var(--gold);
  color: var(--gold-soft);
}

.services__list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--hairline);
}

.services__row {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  align-items: center;
  gap: 20px;
  padding: 20px 4px;
  background: none;
  border: none;
  border-bottom: 1px solid var(--hairline);
  color: var(--text);
  text-align: left;
  font-family: inherit;
  transition: padding-left 0.2s ease;
}

.services__row:hover {
  padding-left: 10px;
}

.services__row:hover .services__name {
  color: var(--gold-soft);
}

.services__name {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: var(--font-display);
  font-size: 1.1rem;
  transition: color 0.2s ease;
}

.services__duration {
  color: var(--text-faint);
  font-size: 0.84rem;
  white-space: nowrap;
}

.services__price {
  color: var(--gold-soft);
  font-size: 1rem;
  white-space: nowrap;
}

.services__chevron {
  color: var(--text-faint);
  flex-shrink: 0;
}

@media (max-width: 560px) {
  .services__row {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'name price'
      'duration price';
    row-gap: 4px;
  }

  .services__name {
    grid-area: name;
  }

  .services__duration {
    grid-area: duration;
  }

  .services__price {
    grid-area: price;
  }

  .services__chevron {
    display: none;
  }
}
</style>
