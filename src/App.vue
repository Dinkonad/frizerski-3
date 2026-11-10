<script setup lang="ts">
import TheNavbar from './components/TheNavbar.vue'
import TheHero from './components/TheHero.vue'
import ServicesSection from './components/ServicesSection.vue'
import WhyUsSection from './components/WhyUsSection.vue'
import AboutSection from './components/AboutSection.vue'
import QuoteSection from './components/QuoteSection.vue'
import BookingBanner from './components/BookingBanner.vue'
import TheFooter from './components/TheFooter.vue'
import BookingModal from './components/BookingModal.vue'
</script>

<template>
  <div class="page">
    <TheNavbar />
    <main>
      <TheHero />
      <ServicesSection />
      <WhyUsSection />
      <AboutSection />
      <QuoteSection />
      <BookingBanner />
    </main>
    <TheFooter />
    <BookingModal />
  </div>
</template>
