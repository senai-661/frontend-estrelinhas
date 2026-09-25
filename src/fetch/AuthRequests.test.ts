import { beforeEach, describe, expect, it, vi } from 'vitest';
import AuthRequests from './AuthRequests';

describe('AuthRequests.login', () => {
  beforeEach(() => {
    const storage = new Map<string, string>();
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
        removeItem: (key: string) => storage.delete(key),
        clear: () => storage.clear(),
      },
      configurable: true,
    });

    vi.restoreAllMocks();
  });

  it('accepts a valid login response even when the backend omits the auth flag', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          token: 'jwt.token.value',
          usuario: {
            nome: 'Professor',
            email: 'professor@email.com',
            role: 'professor',
          },
        }),
      })
    );

    await expect(
      AuthRequests.login({ email: 'professor@email.com', senha: '123456' })
    ).resolves.toBe(true);

    expect(localStorage.getItem('token')).toBe('jwt.token.value');
    expect(localStorage.getItem('isAuth')).toBe('true');
    expect(localStorage.getItem('nome')).toBe('Professor');
  });
});
