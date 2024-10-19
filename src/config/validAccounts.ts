const validAccounts = [
  import.meta.env.VITE_VALID_EMAIL,
  import.meta.env.VITE_VALID_EMAIL2,
];

// @1frencho: IS NOT A GOOD PRACTICE THIS.
export function isValidAccount(email: string | null): boolean {
  if (!email) return false;
  return validAccounts.includes(email);
}
