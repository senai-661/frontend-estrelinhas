// A URL é fornecida pelo .env.local ou pelo ambiente de build da Vercel.
const apiUrl = (import.meta as ImportMeta & { readonly env: { readonly VITE_API_URL?: string } }).env.VITE_API_URL?.trim();

if (!apiUrl) {
  throw new Error('Configure a variável de ambiente VITE_API_URL.');
}

// Evita duas barras ao juntar a URL com caminhos como /produtos.
export const API_URL = apiUrl.replace(/\/+$/, '');