<script setup lang="ts">
import { watch } from 'vue'
import { serviceCategories, type Service } from '../data/salon'
import { useBooking } from '../composables/useBooking'

const {
  isOpen,
  step,
  selectedService,
  selectedDate,
  selectedTime,
  selectedDateLabel,
  submitting,
  form,
  availableDays,
  timeSlotsForSelectedDate,
  canGoDetails,
  canConfirm,
  closeBooking,
  resetBooking,
  chooseService,
  chooseDateTime,
  goToStep,
  goBack,
  submitBooking,
} = useBooking()

const stepLabels: Record<string, string> = {
  service: 'Usluga',
  datetime: 'Termin',
  details: 'Podaci',
  confirm: 'Potvrda',
}

function handleClose() {
  closeBooking()
}

function handleAfterLeave() {
  resetBooking()
}

function pickService(service: Service) {
  chooseService(service)
}

function pickTime(dateKey: string, time: string) {
  chooseDateTime(dateKey, time)
}

function selectDay(dateKey: string) {
  selectedDate.value = dateKey
  selectedTime.value = null
}

function goNextFromDatetime() {
  if (canGoDetails.value) goToStep('details')
}

function goNextFromDetails() {
  goToStep('confirm')
}

watch(isOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade" @after-leave="handleAfterLeave">
      <div v-if="isOpen" class="modal-overlay" @click.self="handleClose" @keydown.esc="handleClose">
        <div class="modal" role="dialog" aria-modal="true" aria-label="Rezervacija termina">
          <header class="modal__head">
            <div class="modal__steps" v-if="step !== 'success'">
              <span
                v-for="key in ['service', 'datetime', 'details', 'confirm']"
                :key="key"
                class="modal__step"
                :class="{ 'is-active': key === step }"
              >
                {{ stepLabels[key] }}
              </span>
            </div>
            <button class="modal__close" aria-label="Zatvori" @click="handleClose">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M5 5l14 14M19 5 5 19" />
              </svg>
            </button>
          </header>

          <div class="modal__body">
            <!-- Step 1: service -->
            <div v-if="step === 'service'" class="step">
              <h3>Odaberi uslugu</h3>
              <div v-for="cat in serviceCategories" :key="cat.id" class="step__group">
                <p class="step__group-title">{{ cat.label }}</p>
                <button
                  v-for="service in cat.services"
                  :key="service.id"
                  class="service-option"
                  :class="{ 'is-selected': selectedService?.id === service.id }"
                  @click="pickService(service)"
                >
                  <span>{{ service.name }}</span>
                  <span class="service-option__meta">{{ service.duration }} · {{ service.price }}</span>
                </button>
              </div>
            </div>

            <!-- Step 2: datetime -->
            <div v-else-if="step === 'datetime'" class="step">
              <h3>Odaberi datum i vrijeme</h3>
              <p class="step__hint" v-if="selectedService">
                {{ selectedService.name }} · {{ selectedService.duration }} · {{ selectedService.price }}
              </p>

              <div class="day-scroller">
                <button
                  v-for="day in availableDays"
                  :key="day.key"
                  class="day-chip"
                  :class="{ 'is-selected': selectedDate === day.key }"
                  @click="selectDay(day.key)"
                >
                  <span>{{ day.dayLabel }}</span>
                  <strong>{{ day.dateLabel }}</strong>
                </button>
              </div>

              <div v-if="selectedDate" class="time-grid">
                <button
                  v-for="time in timeSlotsForSelectedDate"
                  :key="time"
                  class="time-chip"
                  :class="{ 'is-selected': selectedTime === time }"
                  @click="pickTime(selectedDate, time)"
                >
                  {{ time }}
                </button>
                <p v-if="!timeSlotsForSelectedDate.length" class="step__hint">Nema slobodnih termina ovaj dan.</p>
              </div>

              <div class="step__actions">
                <button class="btn btn-ghost" @click="goBack">Natrag</button>
                <button class="btn btn-primary" :disabled="!canGoDetails" @click="goNextFromDatetime">Dalje</button>
              </div>
            </div>

            <!-- Step 3: details -->
            <div v-else-if="step === 'details'" class="step">
              <h3>Tvoji podaci</h3>
              <form class="form" @submit.prevent="goNextFromDetails">
                <label class="field">
                  <span>Ime i prezime *</span>
                  <input v-model="form.name" type="text" required placeholder="Npr. Ana Anić" />
                </label>
                <label class="field">
                  <span>Telefon *</span>
                  <input v-model="form.phone" type="tel" required placeholder="09X XXX XXXX" />
                </label>
                <label class="field">
                  <span>E-mail</span>
                  <input v-model="form.email" type="email" placeholder="ana@primjer.hr" />
                </label>
                <label class="field">
                  <span>Napomena</span>
                  <textarea v-model="form.note" rows="3" placeholder="Želje, alergije, prijašnja boja…" />
                </label>

                <div class="step__actions">
                  <button type="button" class="btn btn-ghost" @click="goBack">Natrag</button>
                  <button type="submit" class="btn btn-primary" :disabled="!canConfirm">Dalje</button>
                </div>
              </form>
            </div>

            <!-- Step 4: confirm -->
            <div v-else-if="step === 'confirm'" class="step">
              <h3>Provjeri i potvrdi</h3>
              <dl class="summary">
                <div>
                  <dt>Usluga</dt>
                  <dd>{{ selectedService?.name }} ({{ selectedService?.duration }}, {{ selectedService?.price }})</dd>
                </div>
                <div>
                  <dt>Termin</dt>
                  <dd>{{ selectedDateLabel }} u {{ selectedTime }}</dd>
                </div>
                <div>
                  <dt>Ime</dt>
                  <dd>{{ form.name }}</dd>
                </div>
                <div>
                  <dt>Kontakt</dt>
                  <dd>{{ form.phone }}<span v-if="form.email"> · {{ form.email }}</span></dd>
                </div>
                <div v-if="form.note">
                  <dt>Napomena</dt>
                  <dd>{{ form.note }}</dd>
                </div>
              </dl>
              <p class="step__hint">Ovo je demo rezervacija — zahtjev se ne šalje u salon.</p>
              <div class="step__actions">
                <button class="btn btn-ghost" @click="goBack">Natrag</button>
                <button class="btn btn-primary" :disabled="submitting" @click="submitBooking">
                  {{ submitting ? 'Slanje…' : 'Potvrdi rezervaciju' }}
                </button>
              </div>
            </div>

            <!-- Step 5: success -->
            <div v-else class="step step--success">
              <span class="success-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M5 13l4.5 4.5L19 7" />
                </svg>
              </span>
              <h3>Termin rezerviran!</h3>
              <p class="step__hint">
                {{ selectedDateLabel }} u {{ selectedTime }} · {{ selectedService?.name }}. Potvrda je (demo) poslana na
                {{ form.phone }}.
              </p>
              <button class="btn btn-primary" @click="handleClose">Zatvori</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 9, 7, 0.72);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 100;
  padding: 0;
}

@media (min-width: 640px) {
  .modal-overlay {
    align-items: center;
    padding: 24px;
  }
}

.modal {
  width: 100%;
  max-width: 480px;
  max-height: 92vh;
  overflow-y: auto;
  background: var(--ink);
  border: 1px solid var(--hairline);
  border-radius: 18px 18px 0 0;
  padding: 28px 24px 32px;
}

@media (min-width: 640px) {
  .modal {
    border-radius: 18px;
  }
}

.modal__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;
}

.modal__steps {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.modal__step {
  font-size: 0.74rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.modal__step.is-active {
  color: var(--gold-soft);
}

.modal__close {
  background: none;
  border: none;
  color: var(--text-muted);
  padding: 4px;
}

.modal__close:hover {
  color: var(--cream);
}

.step h3 {
  font-size: 1.3rem;
  margin-bottom: 18px;
}

.step__group {
  margin-bottom: 18px;
}

.step__group-title {
  color: var(--gold);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.service-option {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  background: var(--ink-2);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-sm);
  color: var(--text);
  margin-bottom: 8px;
  text-align: left;
  font-size: 0.92rem;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.service-option:hover {
  border-color: var(--gold-dim);
}

.service-option.is-selected {
  border-color: var(--gold);
  background: rgba(201, 165, 104, 0.1);
}

.service-option__meta {
  color: var(--text-faint);
  font-size: 0.8rem;
  white-space: nowrap;
}

.step__hint {
  color: var(--text-muted);
  font-size: 0.86rem;
  margin-bottom: 16px;
}

.day-scroller {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 6px;
  margin-bottom: 18px;
}

.day-chip {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--hairline);
  background: var(--ink-2);
  color: var(--text-muted);
  font-size: 0.78rem;
}

.day-chip strong {
  color: var(--cream);
  font-weight: 500;
  font-size: 0.86rem;
}

.day-chip.is-selected {
  border-color: var(--gold);
  background: rgba(201, 165, 104, 0.12);
  color: var(--gold-soft);
}

.day-chip.is-selected strong {
  color: var(--gold-soft);
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.time-chip {
  padding: 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--hairline);
  background: var(--ink-2);
  color: var(--text-muted);
  font-size: 0.86rem;
}

.time-chip.is-selected {
  border-color: var(--gold);
  background: rgba(201, 165, 104, 0.12);
  color: var(--gold-soft);
}

.step__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.86rem;
  color: var(--text-muted);
}

.field input,
.field textarea {
  background: var(--ink-2);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  color: var(--cream);
  font-family: inherit;
  font-size: 0.92rem;
  resize: none;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--gold-dim);
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 18px;
}

.summary > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--hairline);
}

.summary dt {
  color: var(--gold);
  font-size: 0.74rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.summary dd {
  margin: 0;
  color: var(--cream);
  font-size: 0.94rem;
}

.step--success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  padding: 20px 0 6px;
}

.success-mark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--gold-soft);
  background: rgba(201, 165, 104, 0.12);
  border: 1px solid var(--gold-dim);
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.22s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
