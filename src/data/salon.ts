export interface Service {
  id: string
  name: string
  duration: string
  price: string
}

export interface ServiceCategory {
  id: string
  label: string
  services: Service[]
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'kosa',
    label: 'Šišanje i styling',
    services: [
      { id: 'sisanje-zensko', name: 'Žensko šišanje', duration: '40 min', price: '15 €' },
      { id: 'fen', name: 'Pranje i fen styling', duration: '30 min', price: '12 €' },
      { id: 'svecana', name: 'Svečana frizura / pletenice', duration: '60 min', price: '35 €' },
      { id: 'sisanje-musko', name: 'Muško šišanje', duration: '30 min', price: '12 €' },
      { id: 'sisanje-djecje', name: 'Dječje šišanje', duration: '30 min', price: '10 €' },
    ],
  },
  {
    id: 'boja',
    label: 'Boja i pramenovi',
    services: [
      { id: 'farbanje', name: 'Farbanje kose (jedna nijansa)', duration: '90 min', price: '35 €' },
      { id: 'balayage', name: 'Pramenovi / Balayage', duration: '120 min', price: '65 €' },
      { id: 'toniranje', name: 'Toniranje / Preljev', duration: '45 min', price: '25 €' },
      { id: 'izbjeljivanje', name: 'Izbjeljivanje + toniranje', duration: '150 min', price: '80 €' },
    ],
  },
  {
    id: 'njega',
    label: 'Keune njega',
    services: [
      { id: 'keune-njega', name: 'Keune dubinska njega', duration: '30 min', price: '18 €' },
      { id: 'keratin', name: 'Keratinsko izravnavanje', duration: '120 min', price: '90 €' },
      { id: 'pranje', name: 'Pranje i fen (bez šišanja)', duration: '20 min', price: '8 €' },
    ],
  },
]

export const allServices: Service[] = serviceCategories.flatMap((c) => c.services)

export interface WorkingHoursEntry {
  days: string
  hours: string
  dow: number[]
  open?: { start: string; end: string }
}

// dow: 0 = nedjelja ... 6 = subota
export const workingHours: WorkingHoursEntry[] = [
  { days: 'Ponedjeljak, srijeda, petak', hours: '13:00 – 20:00', dow: [1, 3, 5], open: { start: '13:00', end: '20:00' } },
  { days: 'Utorak, četvrtak', hours: '09:00 – 16:00', dow: [2, 4], open: { start: '09:00', end: '16:00' } },
  { days: 'Subota', hours: '09:00 – 14:00', dow: [6], open: { start: '09:00', end: '14:00' } },
  { days: 'Nedjelja', hours: 'Zatvoreno', dow: [0] },
]

export const salon = {
  name: 'Beauty by M',
  city: 'Pula, Istra',
  phone: '+385 95 359 4043',
  phoneHref: '+385953594043',
  instagram: '@beautybym.2023',
  instagramUrl: 'https://www.instagram.com/beautybym.2023/',
  followers: '750+',
  products: 'Keune',
}
