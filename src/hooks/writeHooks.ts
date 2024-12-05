import { useWriteContract } from "wagmi";
import contractABI from '@/contracts/TalentoTechAbi.json';

const contractAddress = '0x850A514822A81f2Ed0fEa5dDcc3A703E9D3d7345';

//✅ Si el usuario es el propietario, permite retirar el saldo acumulado de las ventas de NFTs.
export const useWithdraw = () => {
    const { writeContract } = useWriteContract();

    const withdraw = async () => {
        writeContract({
            abi: contractABI,
            address: contractAddress,
            functionName: "withdraw",
        });
    };

    return { withdraw };
};

//✅ Si el usuario es el propietario, permite establecer el precio de TODOS los NFTs.
export const useSetPrice = () => {
    const { writeContract } = useWriteContract();

    const setPrice = async (newPrice: bigint) => {
        writeContract({
            abi: contractABI,
            address: contractAddress,
            functionName: "setPrice",
            args: [newPrice],
        });
    };

    return { setPrice };
};

//✅ Permite comprar un NFT.
export const useBuyNFT = () => {
    const { writeContract } = useWriteContract();

    const buyNFT = async (tokenId: number, price: bigint) => {
        console.log("Buying NFT with tokenId:", tokenId);
        console.log("Price:", price);

        await writeContract({
            abi: contractABI,
            address: contractAddress,
            functionName: "buyNFT",
            args: [tokenId], 
            value: price,
        });
    };

    return { buyNFT };
};