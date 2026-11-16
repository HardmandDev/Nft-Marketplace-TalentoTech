import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@nextui-org/react';
import { formatEther } from 'viem';
import { usePrice } from '@/hooks/readHooks';
import { useNfts } from '@/hooks/useNfts';
import { useBuyNFT } from '@/hooks/writeHooks';
import { getErrorMessage } from '@/utils/errors';

const MarketplacePage: React.FC = () => {
    const { address } = useAccount();
    const { data: price } = usePrice();
    const priceLoaded = typeof price === 'bigint';
    const formattedPrice = priceLoaded ? formatEther(price) : '...';

    const { nfts, isLoading, error } = useNfts();
    const { buyNFT, isPending, isConfirming, isSuccess, error: buyError } = useBuyNFT();
    const [buyingTokenId, setBuyingTokenId] = useState<number | null>(null);
    const isBusy = isPending || isConfirming;

    const handleBuyNFT = (tokenId: number) => {
        if (!priceLoaded) return;
        setBuyingTokenId(tokenId);
        buyNFT(tokenId, price);
    };

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {getErrorMessage(error)}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold my-4">Listado completo de NFTs</h1>
            <p className="text-lg mb-4">El precio de cada uno de los NFTs es: {formattedPrice} ETH</p>

            {buyError && (
                <p role="alert" className="text-danger mb-4">
                    No se pudo completar la compra: {getErrorMessage(buyError)}
                </p>
            )}
            {isSuccess && <p role="status" className="text-success mb-4">¡Compra confirmada!</p>}

            {nfts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nfts.map((nft) => {
                        const isMine = address?.toLowerCase() === nft.owner.toLowerCase();
                        const isThisBuying = isBusy && buyingTokenId === nft.tokenId;

                        return (
                            <div key={nft.tokenId} className="bg-slate-800 p-1 rounded-lg shadow-lg flex flex-col items-center">
                                {nft.image ? (
                                    <img
                                        src={nft.image}
                                        alt={nft.name ?? `NFT ${nft.tokenId}`}
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-40 object-cover rounded-t-lg"
                                    />
                                ) : (
                                    <div className="w-full h-40 rounded-t-lg bg-slate-700 flex items-center justify-center text-slate-300 text-sm">
                                        {nft.metadataLoading ? 'Cargando imagen...' : 'Imagen no disponible'}
                                    </div>
                                )}
                                <p className='text-white'>{nft.name ?? `NFT #${nft.tokenId}`}</p>
                                {isMine ? (
                                    <p className="text-slate-300 text-sm mt-2">Es tuyo</p>
                                ) : (
                                    <Button
                                        onClick={() => handleBuyNFT(nft.tokenId)}
                                        isDisabled={isBusy || !priceLoaded}
                                        color="secondary"
                                        variant="flat"
                                        className="mt-2"
                                    >
                                        {isThisBuying ? "Procesando..." : "Comprar"}
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No se encontraron NFTs.</p>
            )}
        </div>
    );
};

export default MarketplacePage;
