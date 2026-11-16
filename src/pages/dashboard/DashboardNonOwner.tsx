import { useAccount } from 'wagmi';
import { useNfts } from '@/hooks/useNfts';
import { getErrorMessage } from '@/utils/errors';

const DashboardNonOwner: React.FC = () => {
  const { address } = useAccount();
  const { nfts, isLoading, error } = useNfts();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {getErrorMessage(error)}</div>;

  const myNfts = nfts.filter((nft) => address?.toLowerCase() === nft.owner.toLowerCase());

  return (
    <div>
      <h2 className='text-2xl font-bold my-4'>Tus NFTs:</h2>
      {myNfts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myNfts.map((nft) => (
            <div key={nft.tokenId} className="bg-white p-1 rounded-lg shadow-lg flex flex-col items-center">
              {nft.image ? (
                <img
                  src={nft.image}
                  alt={nft.name ?? `NFT ${nft.tokenId}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-40 rounded-t-lg bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
                  {nft.metadataLoading ? 'Cargando imagen...' : 'Imagen no disponible'}
                </div>
              )}
              <p className='text-black'>{nft.name ?? `NFT #${nft.tokenId}`}</p>
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
