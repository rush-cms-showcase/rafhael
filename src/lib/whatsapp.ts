export function buildWhatsappUrl(number: string, message: string): string {
  const cleanNumber = number.replace(/\D/g, '')
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
}
