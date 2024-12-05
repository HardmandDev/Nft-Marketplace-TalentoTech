import { useEffect, useState } from 'react';
import { useTokenURI, useOwnerOf } from '@/hooks/readHooks';
import { useAccount } from 'wagmi';

interface OwnerData {
  result: string;
}

const DashboardNonOwner: React.FC = () => {
  const { address } = useAccount();
  const { data: tokenData, error: tokenError, isLoading: tokenLoading } = useTokenURI();
  const { data: ownerData, error: ownerError, isLoading: ownerLoading } = useOwnerOf();
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    if (tokenData && ownerData) {

      const fetchImages = async () => {
        try {
          const filteredTokens = tokenData.filter((_, index) => {
            const owner = ownerData[index] as OwnerData;

            return owner.result.toLowerCase() === address?.toLowerCase();
          });

          if (filteredTokens.length === 0) {
            console.warn("No se encontraron tokens para este propietario");
          }

          const tokensWithImages = await Promise.all(
            filteredTokens.map(async (item: any) => {
              const jsonUrl = item.result;
              const response = await fetch(jsonUrl);
              const jsonData = await response.json();
              return {
                name: jsonData.name,
                imageUrl: jsonData.image,
              };
            })
          );

          setTokens(tokensWithImages);
        } catch (err) {
          console.error('Error al obtener las imágenes:', err);
        }
      };

      fetchImages();
    }
  }, [tokenData, ownerData, address]);

  if (tokenLoading || ownerLoading) return <div>Cargando...</div>;
  if (tokenError || ownerError) return <div>Error: {tokenError?.message || ownerError?.message}</div>;

  return (
    <div>
      <h2 className='text-2xl font-bold my-4'>Tus NFTs:</h2>
      {tokens.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens.map((token, index) => (
            <div key={index} className="bg-white p-1 rounded-lg shadow-lg flex flex-col items-center">
              <img
                src={token.imageUrl}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <p className='text-black'>{token.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes NFTs.</p>
      )}
    </div>
  );
};

export default DashboardNonOwner;
