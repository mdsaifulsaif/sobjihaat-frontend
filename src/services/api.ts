// src/services/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function serverFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      cache: 'force-cache',
      next: { revalidate: 3600 }, // ১ ঘণ্টার ISR ক্যাশ
      ...options,
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Server Fetch Error (${endpoint}):`, error);
    return null;
  }
}