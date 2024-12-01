import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { initializeEthereum } from "@/services/ethereumService"; 

const useEthereum = () => {
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [error, setError] = useState<string | null>(null); // Para manejo de errores

  useEffect(() => {
    const initEthereum = async () => {
      try {
        // Llamar a la función que inicializa el provider y signer
        const { provider, signer } = await initializeEthereum();
        
        // Asignar a los estados
        setProvider(provider);
        setSigner(signer);
      } catch (err: any) {
        // Manejo de errores
        setError("Error al conectar con Ethereum: " + err.message);
      }
    };

    initEthereum();
  }, []); // Solo ejecutar al montar el componente

  return { provider, signer, error };
};

export default useEthereum;
