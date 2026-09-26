// Veilige toegang tot sessionStorage: faalt stil in privémodus of met strikte browserinstellingen.
export const store = {
  get(k: string): string | null { try { return sessionStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { sessionStorage.setItem(k, v); } catch { /* niet beschikbaar */ } },
  remove(...ks: string[]) { try { ks.forEach(k => sessionStorage.removeItem(k)); } catch { /* niet beschikbaar */ } },
  json<T>(k: string): T | null { try { return JSON.parse(sessionStorage.getItem(k) || 'null') as T; } catch { return null; } },
};
