const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';
const IPFS_PATH_PATTERN = /^[A-Za-z0-9._~\-/]+$/;

// Solo se aceptan URLs https:// e ipfs://. Cualquier otro esquema (javascript:, data:, http:) se descarta.
export const toSafeUrl = (raw: unknown): string | undefined => {
  if (typeof raw !== 'string') return undefined;
  const value = raw.trim();

  if (value.startsWith('ipfs://')) {
    const path = value.slice('ipfs://'.length).replace(/^ipfs\//, '');
    return IPFS_PATH_PATTERN.test(path) ? IPFS_GATEWAY + path : undefined;
  }

  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : undefined;
  } catch {
    return undefined;
  }
};

export interface NftMetadata {
  name: string;
  image?: string;
}

export const fetchMetadata = async (uri: string, signal?: AbortSignal): Promise<NftMetadata> => {
  const url = toSafeUrl(uri);
  if (!url) throw new Error('La URL de los metadatos no es válida.');

  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`No se pudieron obtener los metadatos (HTTP ${response.status}).`);

  const json: unknown = await response.json();
  if (typeof json !== 'object' || json === null) throw new Error('Los metadatos no son válidos.');

  const { name, image } = json as Record<string, unknown>;
  return {
    name: typeof name === 'string' && name.trim() ? name.trim().slice(0, 100) : 'Sin nombre',
    image: toSafeUrl(image),
  };
};
