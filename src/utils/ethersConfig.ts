import { ethers } from 'ethers';

const sepoliaRpcUrl = import.meta.env.VITE_SEPOLIA_RPC_URL;
const provider = new ethers.JsonRpcProvider(sepoliaRpcUrl);


// Opcional: Conecta una wallet al proveedor
const getSigner = (privateKey: string) => {
    return new ethers.Wallet(privateKey, provider);
};

export { provider, getSigner };
