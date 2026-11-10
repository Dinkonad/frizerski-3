<script setup lang="ts">
import { ref } from 'vue'
import { salon } from '../data/salon'
import { useBooking } from '../composables/useBooking'

const { openBooking } = useBooking()
const isMenuOpen = ref(false)

const links = [
  { href: '#usluge', label: 'Usluge' },
  { href: '#o-nama', label: 'O salonu' },
  { href: '#dojmovi', label: 'Dojmovi' },
  { href: '#kontakt', label: 'Kontakt' },
]

function closeMenu() {
  isMenuOpen.value = false
}

function closeMenuAndBook() {
  isMenuOpen.value = false
  openBooking()
}
</script>

<template>
  <header class="navbar">
    <div class="container navbar__inner">
      <a href="#" class="navbar__brand" @click="closeMenu">
        <span class="navbar__mark" aria-hidden="true">M</span>
        <span class="navbar__name">{{ salon.name }}</span>
      </a>

      <nav class="navbar__links" aria-label="Glavna navigacija">
        <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
      </nav>

      <button class="btn btn-primary btn-sm navbar__cta" @click="openBooking()">Rezerviraj termin</button>

      <button
        class="navbar__toggle"
        :aria-expanded="isMenuOpen"
        aria-label="Otvori izbornik"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span />
        <span />
        <span />
      </button>
    </div>

    <transition name="fade-slide">
      <div v-if="isMenuOpen" class="navbar__mobile">
        <a v-for="link in links" :key="link.href" :href="link.href" @click="closeMenu">{{ link.label }}</a>
        <button class="btn btn-primary" @click="closeMenuAndBook">Rezerviraj termin</button>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(21, 19, 15, 0.78);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--hairline);
}

.navbar__inner {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-block: 16px;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: auto;
}

.navbar__mark {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--gold-dim);
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-style: italic;
  color: var(--gold-soft);
  font-size: 1.05rem;
}

.navbar__name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--cream);
  letter-spacing: 0.02em;
}

.navbar__links {
  display: flex;
  gap: 28px;
  font-size: 0.92rem;
  color: var(--text-muted);
}

.navbar__links a:hover {
  color: var(--gold-soft);
}

.navbar__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 8px;
}

.navbar__toggle span {
  width: 22px;
  height: 1.5px;
  background: var(--cream);
  display: block;
}

.navbar__mobile {
  display: none;
}

@media (max-width: 860px) {
  .navbar__links {
    display: none;
  }

  .navbar__cta {
    display: none;
  }

  .navbar__toggle {
    display: flex;
  }

  .navbar__mobile {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 20px 24px 28px;
    border-top: 1px solid var(--hairline);
  }

  .navbar__mobile a {
    color: var(--text-muted);
    font-size: 1rem;
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
