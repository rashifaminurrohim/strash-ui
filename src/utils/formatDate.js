export function formatDate(dateInput) {
  if (!dateInput) return '-';

  let date;
  // Jika Firestore Timestamp
  if (typeof dateInput === 'object' && dateInput._seconds) {
    date = new Date(dateInput._seconds * 1000);
  } else {
    date = new Date(dateInput);
  }

  if (isNaN(date.getTime())) return '-';
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };
  return date.toLocaleString('id-ID', options);
} 