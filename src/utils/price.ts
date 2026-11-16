import { parseEther } from 'viem';

// Precio en ETH: entero o decimal (también ".5") con hasta 18 decimales (sin signo, sin notación científica).
const PRICE_PATTERN = /^(\d+(\.\d{1,18})?|\.\d{1,18})$/;

const MAX_UINT256 = 2n ** 256n;

// Convierte el texto del input a wei. Devuelve el error en español si la entrada no es válida.
export const parsePriceInput = (raw: string): { wei: bigint } | { error: string } => {
  const text = raw.trim();
  if (!PRICE_PATTERN.test(text)) {
    return { error: 'Introduce un precio válido en ETH (hasta 18 decimales).' };
  }
  const wei = parseEther(text);
  if (wei === 0n) {
    return { error: 'El precio debe ser mayor que 0.' };
  }
  if (wei >= MAX_UINT256) {
    return { error: 'El precio es demasiado grande.' };
  }
  return { wei };
};
