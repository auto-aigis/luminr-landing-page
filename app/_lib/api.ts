import { User, Brand, AnalysisRun, Subscription, UserSettings, CheckoutSession, Tier } from './types';

const API_URL = '';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
  if (!res.ok) {
    let msg = `API error: ${res.status}`;
    try {
      const err = await res.json();
      const d = err.detail;
      if (typeof d === 'string') msg = d;
      else if (Array.isArray(d)) msg = d.map((e: any) => e.msg).join(', ');
      else if (err.error) msg = err.error;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export const authApi = {
  register: async (email: string, password: string, display_name?: string) =>
    apiFetch<{ status: string; email: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, display_name }),
    }),

  login: async (email: string, password: string) =>
    apiFetch<User>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: async () =>
    apiFetch<{ status: string }>('/api/auth/logout', {
      method: 'POST',
    }),

  me: async () => apiFetch<User>('/api/auth/me'),

  subscription: async () => apiFetch<Subscription>('/api/auth/subscription'),

  verifyEmail: async (token: string) =>
    apiFetch<{ status: string }>('/api/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),

  resendVerification: async (email: string) =>
    apiFetch<{ status: string }>('/api/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

export const brandApi = {
  create: async (data: { name: string; website_url: string; industry_vertical: string; competitors: string[] }) =>
    apiFetch<Brand>('/api/brands/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  list: async () => apiFetch<Brand[]>('/api/brands/'),

  update: async (brandId: string, data: Partial<{ name: string; website_url: string; industry_vertical: string; competitors: string[] }>) =>
    apiFetch<Brand>(`/api/brands/${brandId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: async (brandId: string) =>
    apiFetch<{ status: string }>(`/api/brands/${brandId}`, {
      method: 'DELETE',
    }),
};

export const analysisApi = {
  run: async (brandId: string) =>
    apiFetch<AnalysisRun>('/api/analysis/run', {
      method: 'POST',
      body: JSON.stringify({ brand_id: brandId }),
    }),

  latest: async (brandId: string) =>
    apiFetch<AnalysisRun>(`/api/analysis/${brandId}/latest`),

  history: async (brandId: string) =>
    apiFetch<AnalysisRun[]>(`/api/analysis/${brandId}/history`),
};

export const settingsApi = {
  get: async () => apiFetch<UserSettings>('/api/settings/'),

  update: async (data: { openai_api_key?: string; slack_webhook_url?: string; alert_threshold?: number }) =>
    apiFetch<UserSettings>('/api/settings/', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

export const paddleApi = {
  getSubscription: async () =>
    apiFetch<{ id: string; tier: Tier; status: string; price_id?: string; current_period_end?: string; paddle_subscription_id?: string }>('/api/paddle/subscription'),

  createCheckout: async (tier: string, billingInterval: string) =>
    apiFetch<CheckoutSession>('/api/paddle/checkout', {
      method: 'POST',
      body: JSON.stringify({ tier, billing_interval: billingInterval }),
    }),

  cancelSubscription: async () =>
    apiFetch<{ status: string }>('/api/paddle/subscription?action=cancel', {
      method: 'PUT',
    }),
};
