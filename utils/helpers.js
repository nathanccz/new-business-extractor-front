export function formatCityName(city) {
  return city
    .split(' ')
    .map((part) => part[0].toUpperCase() + part.substring(1).toLowerCase())
    .join(' ')
}
