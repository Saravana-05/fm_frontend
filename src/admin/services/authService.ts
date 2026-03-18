// ─── Base URL (from swagger: http://127.0.0.1:8000/docs) ────
const BASE_URL = 'http://127.0.0.1:8000'

// ─── Request payloads ────────────────────────────────────────
export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string       // ← change to full_name / username if your schema differs
  email: string
  password: string
}

// ─── FastAPI response shapes ─────────────────────────────────
// FastAPI OAuth2 returns { access_token, token_type }
// Custom endpoints may return { token, user } — adjust below to match your schema
interface RawAuthResponse {
  access_token?: string   // FastAPI OAuth2 standard
  token?: string          // custom backends
  token_type?: string
  user?: {
    id: string
    name: string
    email: string
    role?: string
  }
  // Some backends return user fields at the top level
  id?: string
  name?: string
  email?: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    role?: string
  }
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}

// ─── Token helpers ───────────────────────────────────────────
export const tokenStorage = {
  set:   (token: string) => localStorage.setItem('fm_token', token),
  get:   ()              => localStorage.getItem('fm_token'),
  clear: ()              => localStorage.removeItem('fm_token'),
}

// ─── Core fetch wrapper ──────────────────────────────────────
async function request<T>(endpoint: string, options: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    // FastAPI returns { detail: "..." } for errors
    // Express/Django may return { message: "..." } or { error: "..." }
    const err: ApiError = {
      message:
        (typeof data?.detail === 'string' ? data.detail : null) ??
        data?.message ??
        data?.error ??
        'Something went wrong. Please try again.',

      // FastAPI validation errors: { detail: [{ loc, msg, type }] }
      errors: Array.isArray(data?.detail)
        ? Object.fromEntries(
            data.detail.map((d: { loc: string[]; msg: string }) => [
              d.loc[d.loc.length - 1],   // field name (last item in loc array)
              [d.msg],
            ])
          )
        : data?.errors,
    }
    throw err
  }

  return data as T
}

// ─── Normalize raw response → AuthResponse ───────────────────
// Handles both FastAPI OAuth2 shape and custom { token, user } shape
function normalizeAuth(raw: RawAuthResponse, fallbackEmail: string): AuthResponse {
  return {
    token: raw.access_token ?? raw.token ?? '',
    user: raw.user ?? {
      id:    raw.id    ?? '',
      name:  raw.name  ?? fallbackEmail.split('@')[0],
      email: raw.email ?? fallbackEmail,
      role:  undefined,
    },
  }
}

// ─── Auth API ────────────────────────────────────────────────
export const authApi = {
  // POST http://127.0.0.1:8000/auth/login
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const raw = await request<RawAuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return normalizeAuth(raw, payload.email)
  },

  // POST http://127.0.0.1:8000/auth/register
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const raw = await request<RawAuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return normalizeAuth(raw, payload.email)
  },

  logout: () => tokenStorage.clear(),
}