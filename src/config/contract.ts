import { isAddress, type Abi, type Address } from 'viem';
import contractABI from '@/contracts/TalentoTechAbi.json';

const DEFAULT_CONTRACT_ADDRESS = '0x850A514822A81f2Ed0fEa5dDcc3A703E9D3d7345';

const envAddress: string | undefined = import.meta.env.VITE_CONTRACT_ADDRESS;

// Si la variable existe pero está mal escrita, la app no arranca (error en consola) en lugar de usar otro contrato sin avisar.
if (envAddress && !isAddress(envAddress)) {
  throw new Error('VITE_CONTRACT_ADDRESS no es una dirección válida.');
}

export const CONTRACT_ADDRESS = (envAddress || DEFAULT_CONTRACT_ADDRESS) as Address;

// El contrato no expone el total de tokens: se consultan los IDs 1..MAX_TOKEN_ID en un solo multicall
// y se descartan los que no existen (ownerOf revierte). Súbelo si se mintean más NFTs.
export const MAX_TOKEN_ID = 50;

export const smartContract = {
  address: CONTRACT_ADDRESS,
  abi: contractABI as Abi,
} as const;
