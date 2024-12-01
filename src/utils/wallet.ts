import { ethers } from "ethers";

export const connectWallet = async (): Promise<string | null> => {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask no está instalado. Por favor, instálalo para continuar.");
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return address;
  } catch (error) {
    console.error("Error conectando la wallet:", error);
    return null;
  }
};

export const detectWallet = async (): Promise<string | null> => {
  if (typeof window.ethereum === "undefined") {
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return address;
  } catch {
    return null;
  }
};


export const getBalance = async (address: string): Promise<string> => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
};
