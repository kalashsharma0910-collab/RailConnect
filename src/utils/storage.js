const BOOKINGS_KEY = 'railconnect-bookings-v1';

export function getBookings() {
  try {
    const saved = localStorage.getItem(BOOKINGS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}
