export const OCCASIONS = ['Casual dining', 'Birthday', 'Anniversary', 'Other'];
export const SLOTS = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
export function localDate(date = new Date()) {
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
}
export function initialBooking(now = new Date()) {
  return { date: localDate(now), time: '', guests: '2', occasion: 'Casual dining', name: '', email: '', phone: '' };
}
export function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  const d = new Date(`${value}T12:00:00`);
  return !Number.isNaN(d.getTime()) && localDate(d) === value;
}
// Deterministic demo availability. No external restaurant service is contacted.
export function availableTimes(date, now = new Date()) {
  if (!validDate(date) || date < localDate(now)) return [];
  const day = new Date(`${date}T12:00:00`).getDay();
  const times = day === 5 || day === 6 ? SLOTS.filter(t => t !== '19:00') : SLOTS;
  const current = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  return date === localDate(now) ? times.filter(t => t > current) : [...times];
}
export function validateReservation(data, now = new Date()) {
  const errors = {};
  if (!validDate(data.date) || data.date < localDate(now)) errors.date = 'Choose today or a future date.';
  if (!availableTimes(data.date, now).includes(data.time)) errors.time = 'Choose an available time.';
  const count = Number(data.guests);
  if (!Number.isInteger(count) || count < 1 || count > 8) errors.guests = 'Choose between 1 and 8 guests.';
  if (!OCCASIONS.includes(data.occasion)) errors.occasion = 'Choose an occasion.';
  return errors;
}
export function validateContact(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = 'Enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Enter a valid email address.';
  const phone = data.phone.trim();
  if (phone && (!/^\+?[\d ()-]+$/.test(phone) || phone.replace(/\D/g, '').length < 7 || phone.replace(/\D/g, '').length > 15)) errors.phone = 'Enter a valid phone number or leave it blank.';
  return errors;
}
export function initializeTimes(now = new Date()) { return availableTimes(localDate(now), now); }
export function updateTimes(_state, action) {
  return action.type === 'dateChanged' ? availableTimes(action.date, action.now) : _state;
}
export async function submitBooking(data, now = new Date()) {
  const errors = {...validateReservation(data, now), ...validateContact(data)};
  if (Object.keys(errors).length) throw new Error('Please review your booking details and choose an available time.');
  await new Promise(resolve => setTimeout(resolve, 350));
  return { ...data, name: data.name.trim(), email: data.email.trim(), reference: `LL-${globalThis.crypto?.randomUUID?.().slice(0,8).toUpperCase() || Date.now().toString(36).toUpperCase()}` };
}
