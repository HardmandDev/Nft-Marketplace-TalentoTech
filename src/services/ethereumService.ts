import { ethers } from "ethers";

// Variable signer global
export let signer: ethers.JsonRpcSigner | null = null;

export const initializeEthereum = async () => {
  let provider;

  // Verificar si MetaMask está disponible
  if (window.ethereum == null) {
    console.log("MetaMask no está instalado; utilizando un proveedor solo de lectura.");
    
    // Usamos el proveedor por defecto para operaciones solo de lectura
    provider = ethers.getDefaultProvider();
  } else {
    // Si MetaMask está disponible, nos conectamos con su proveedor
    provider = new ethers.BrowserProvider(window.ethereum);

    try {
      // El método `getSigner()` pedirá autorización si el usuario no está conectado
      signer = await provider.getSigner();
      console.log("Cuenta conectada:", await signer.getAddress());
    } catch (error) {
      console.error("Error al conectar con MetaMask:", error);
      throw new Error("No se pudo acceder a la cuenta de MetaMask.");
    }
  }

  return { provider, signer };
};

export const getContractInstance = (signer: ethers.JsonRpcSigner | null) => {
  if (!signer) {
    throw new Error("Signer no disponible.");
  }

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const abi = require("@/contracts/TalentoTechAbi.json");

  // Crear una instancia del contrato
  return new ethers.Contract(contractAddress, abi, signer);
};