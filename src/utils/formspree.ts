export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzdlaoop'

export interface InquiryFormState {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export async function submitInquiryForm(form: InquiryFormState, endpoint = FORMSPREE_ENDPOINT) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(form),
  })

  if (response.ok) {
    return true
  }

  const data = await response.json().catch(() => null)
  const message = data?.errors?.map((err: { message: string }) => err.message).join(', ')
  throw new Error(message || 'Something went wrong while sending your message. Please try again.')
}
