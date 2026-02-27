import { describe, expect, it, vi } from 'vitest';

describe('env', () => {
  it('provides fallback values when env vars are missing', async () => {
    // Clear all VITE_ vars to simulate no .env.local
    vi.stubEnv('VITE_CLOUDINARY_CLOUD_NAME', '');
    vi.stubEnv('VITE_APP_NAME', '');
    vi.stubEnv('VITE_APP_URL', '');

    const { env } = await import('../env');

    expect(env.CLOUDINARY_CLOUD_NAME).toBe('');
    expect(env.APP_NAME).toBeTruthy();
    expect(typeof env.APP_NAME).toBe('string');
    expect(env.APP_URL).toBe('http://localhost:5173');
  });

  it('uses provided env var values when set', async () => {
    vi.stubEnv('VITE_CLOUDINARY_CLOUD_NAME', 'my-cloud');
    vi.stubEnv('VITE_APP_NAME', 'My App');
    vi.stubEnv('VITE_APP_URL', 'https://example.com');

    // Force re-import to pick up new env values
    vi.resetModules();
    const { env } = await import('../env');

    expect(env.CLOUDINARY_CLOUD_NAME).toBe('my-cloud');
    expect(env.APP_NAME).toBe('My App');
    expect(env.APP_URL).toBe('https://example.com');
  });

  it('never throws regardless of missing env vars', async () => {
    vi.stubEnv('VITE_CLOUDINARY_CLOUD_NAME', '');
    vi.stubEnv('VITE_APP_NAME', '');
    vi.stubEnv('VITE_APP_URL', '');
    vi.resetModules();

    await expect(import('../env')).resolves.toBeDefined();
  });
});
