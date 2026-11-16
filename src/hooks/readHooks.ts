import { useMemo } from 'react';
import { useReadContract, useReadContracts } from 'wagmi';
import type { Address } from 'viem';
import { MAX_TOKEN_ID, smartContract } from '@/config/contract';

//✅ Obtener el owner del contrato
export const useOwner = () => {
  return useReadContract({
    ...smartContract,
    functionName: "owner",
  });
};

//✅ Obtener el precio de los NFT
export const usePrice = () => {
  return useReadContract({
    ...smartContract,
    functionName: "getPrice",
  });
};

export interface TokenInfo {
  tokenId: number;
  owner: Address;
  tokenURI: string;
}

const TOKEN_IDS = Array.from({ length: MAX_TOKEN_ID }, (_, i) => i + 1);

const TOKEN_CALLS = TOKEN_IDS.flatMap((tokenId) => [
  { ...smartContract, functionName: "ownerOf", args: [BigInt(tokenId)] },
  { ...smartContract, functionName: "tokenURI", args: [BigInt(tokenId)] },
]);

//✅ Obtener los NFTs que existen (dueño actual y URL de metadatos) en una sola consulta multicall.
// ownerOf revierte para los IDs no minteados; esos resultados se descartan.
export const useTokens = () => {
  const query = useReadContracts({ contracts: TOKEN_CALLS });
  const { data } = query;

  const tokens = useMemo<TokenInfo[]>(() => {
    if (!data) return [];
    return TOKEN_IDS.flatMap((tokenId, index) => {
      const owner = data[index * 2];
      const uri = data[index * 2 + 1];
      if (
        owner?.status === 'success' && typeof owner.result === 'string' &&
        uri?.status === 'success' && typeof uri.result === 'string'
      ) {
        return [{ tokenId, owner: owner.result as Address, tokenURI: uri.result }];
      }
      return [];
    });
  }, [data]);

  // Si existe el último ID consultado puede haber más NFTs fuera del rango.
  const maybeTruncated = tokens.some((token) => token.tokenId === MAX_TOKEN_ID);

  return { ...query, tokens, maybeTruncated };
};
