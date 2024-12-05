import { useEffect, useState } from 'react';
import { usePrice, useTokenURI } from '@/hooks/readHooks';
import { useBuyNFT } from '@/hooks/writeHooks';
import { Button } from '@nextui-org/button';
import { ethers } from 'ethers';

const MarketplacePage: React.FC = () => {
    const { data: price } = usePrice();
    const formatPrice = price && typeof price === "bigint" ? ethers.formatEther(price) : "0";

    const { data, error, isLoading } = useTokenURI();
    const [tokenImages, setTokenImages] = useState<{ image: string, name: string, tokenId: number }[]>([]);

    const [isBuying, setIsBuying] = useState(false);
    const { buyNFT } = useBuyNFT();

    useEffect(() => {
        if (data) {
            const fetchImages = async () => {
                const imageData = await Promise.all(
                    data.map(async (item: any) => {
                        const jsonUrl = item.result;
                        const response = await fetch(jsonUrl);
                        const jsonData = await response.json();
                        return {
                            image: jsonData.image,
                            name: jsonData.name,
                            tokenId: item.tokenId,
                        };
                    })
                );
                setTokenImages(imageData);
            };
    
            fetchImages();
        }
    }, [data]);

    const handleBuyNFT = async (tokenId: number) => {
        if (tokenId === undefined || tokenId === null) {
            console.error('Token ID no es válido:', tokenId);
            return;
        }
    
        setIsBuying(true);
        try {
            const correctPrice = price && typeof price === "bigint" ? price : 0n;
            await buyNFT(tokenId, correctPrice);
        } catch (error) {
            console.error('Error al comprar NFT:', error);
        } finally {
            setIsBuying(false);
        }
    };
    

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold my-4">Listado completo de NFTs</h1>
            <p className="text-lg mb-4">El precio de cada uno de los NFTs es: ${formatPrice} ETH</p>

            {tokenImages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tokenImages.map((item, index) => (
                        <div key={index} className="bg-slate-800 p-1 rounded-lg shadow-lg flex flex-col items-center">
                            <img
                                src={item.image}
                                alt={`NFT ${item.tokenId}`}
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                            <p className='text-white'>{item.name}</p>
                            <Button
                                onClick={() => handleBuyNFT(index + 1)}
                                disabled={isBuying}
                                color="secondary"
                                variant="flat"
                                className="mt-2"
                            >
                                {isBuying ? "Procesando..." : "Comprar"}
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No se encontraron imágenes.</p>
            )}
        </div>
    );
};

export default MarketplacePage;
