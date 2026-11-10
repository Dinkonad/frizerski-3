<script setup lang="ts">
import { useBooking } from '../composables/useBooking'

const { openBooking } = useBooking()
</script>

<template>
  <section class="section booking-banner">
    <div class="container booking-banner__row">
      <h2>Termin te čeka.</h2>
      <button class="btn btn-primary" @click="openBooking()">Rezerviraj termin</button>
    </div>
  </section>
</template>

<style scoped>
.booking-banner__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  padding-top: clamp(32px, 5vw, 48px);
  border-top: 1px solid var(--hairline);
}

.booking-banner h2 {
  font-size: clamp(1.8rem, 3.4vw, 2.6rem);
}
</style>
