import { computed, reactive, ref } from 'vue'
import { workingHours, type Service } from '../data/salon'

export type BookingStep = 'service' | 'datetime' | 'details' | 'confirm' | 'success'

interface BookingForm {
  name: string
  phone: string
  email: string
  note: string
}

const isOpen = ref(false)
const step = ref<BookingStep>('service')
const selectedService = ref<Service | null>(null)
const selectedDate = ref<string | null>(null)
const selectedTime = ref<string | null>(null)
const submitting = ref(false)

const form = reactive<BookingForm>({
  name: '',
  phone: '',
  email: '',
  note: '',
})

const dayLabels = ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota']
const dayLabelsShort = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub']
const monthLabels = [
  'siječnja', 'veljače', 'ožujka', 'travnja', 'svibnja', 'lipnja',
  'srpnja', 'kolovoza', 'rujna', 'listopada', 'studenoga', 'prosinca',
]

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function timeToMinutes(t: string) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function minutesToTime(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export interface AvailableDay {
  key: string
  date: Date
  dow: number
  dayLabel: string
  dateLabel: string
}

const availableDays = computed<AvailableDay[]>(() => {
  const days: AvailableDay[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 1; days.length < 10 && i < 30; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const dow = d.getDay()
    const entry = workingHours.find((w) => w.dow.includes(dow))
    if (!entry?.open) continue
    days.push({
      key: toDateKey(d),
      date: d,
      dow,
      dayLabel: dayLabelsShort[dow],
      dateLabel: `${d.getDate()}. ${monthLabels[d.getMonth()]}`,
    })
  }
  return days
})

const timeSlotsForSelectedDate = computed<string[]>(() => {
  if (!selectedDate.value) return []
  const day = availableDays.value.find((d) => d.key === selectedDate.value)
  if (!day) return []
  const entry = workingHours.find((w) => w.dow.includes(day.dow))
  if (!entry?.open) return []

  const start = timeToMinutes(entry.open.start)
  const end = timeToMinutes(entry.open.end)
  const lastSlot = end - 30
  const slots: string[] = []
  for (let t = start; t <= lastSlot; t += 45) {
    slots.push(minutesToTime(t))
  }
  return slots
})

function openBooking(service?: Service) {
  if (service) selectedService.value = service
  step.value = selectedService.value ? 'datetime' : 'service'
  isOpen.value = true
}

function closeBooking() {
  isOpen.value = false
}

function resetBooking() {
  step.value = 'service'
  selectedService.value = null
  selectedDate.value = null
  selectedTime.value = null
  submitting.value = false
  form.name = ''
  form.phone = ''
  form.email = ''
  form.note = ''
}

function chooseService(service: Service) {
  selectedService.value = service
  step.value = 'datetime'
}

function chooseDateTime(dateKey: string, time: string) {
  selectedDate.value = dateKey
  selectedTime.value = time
}

function goToStep(target: BookingStep) {
  step.value = target
}

function goBack() {
  const order: BookingStep[] = ['service', 'datetime', 'details', 'confirm']
  const idx = order.indexOf(step.value)
  if (idx > 0) step.value = order[idx - 1]
}

const selectedDateLabel = computed(() => {
  const day = availableDays.value.find((d) => d.key === selectedDate.value)
  return day ? `${dayLabels[day.dow]}, ${day.dateLabel}` : ''
})

const canGoDetails = computed(() => Boolean(selectedService.value && selectedDate.value && selectedTime.value))
const canConfirm = computed(() => form.name.trim().length > 1 && form.phone.trim().length > 4)

async function submitBooking() {
  submitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 900))
  submitting.value = false
  step.value = 'success'
}

export function useBooking() {
  return {
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
    openBooking,
    closeBooking,
    resetBooking,
    chooseService,
    chooseDateTime,
    goToStep,
    goBack,
    submitBooking,
  }
}
