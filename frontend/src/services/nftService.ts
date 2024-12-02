import { ethers } from 'ethers';
import contratoTalentoTech from '@/utils/contract';

// Consultar precio actual
export const getPrice = async () => {
    const price = await contratoTalentoTech.getPrice();
    return ethers.formatEther(price); // Convertir a formato Ether
};

// Comprar NFT
// export const buyNFT = async (tokenId: number, signer: ethers.Signer) => {
//     const contratoConSigner = contratoTalentoTech.connect(signer);
//     const price = await contratoTalentoTech.getPrice();
//     const tx = await contratoConSigner.buyNFT(tokenId, { value: price });
//     await tx.wait(); // Esperar a que se confirme
//     return tx.hash;
// };

// Mint NFT (solo para el dueño)
// export const mintNFT = async (signer: ethers.Signer) => {
//     const contratoConSigner = contratoTalentoTech.connect(signer);
//     const tx = await contratoConSigner.mint();
//     await tx.wait();
//     return tx.hash;
// };
