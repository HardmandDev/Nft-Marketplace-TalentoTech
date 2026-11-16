import { useQueries } from '@tanstack/react-query';
import { useTokens } from '@/hooks/readHooks';
import { fetchMetadata } from '@/utils/metadata';

//✅ NFTs existentes con su nombre e imagen. Los metadatos se cachean y un fallo en uno no afecta a los demás.
export const useNfts = () => {
  const { tokens, isLoading, error, maybeTruncated } = useTokens();

  const metadata = useQueries({
    queries: tokens.map((token) => ({
      queryKey: ['nft-metadata', token.tokenURI],
      queryFn: ({ signal }: { signal: AbortSignal }) => fetchMetadata(token.tokenURI, signal),
      staleTime: Infinity,
      retry: 1,
    })),
  });

  const nfts = tokens.map((token, index) => ({
    ...token,
    name: metadata[index]?.data?.name,
    image: metadata[index]?.data?.image,
    metadataLoading: metadata[index]?.isLoading ?? false,
    metadataFailed: metadata[index]?.isError ?? false,
  }));

  return { nfts, isLoading, error, maybeTruncated };
};
