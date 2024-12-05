import { useReadContract, useReadContracts } from "wagmi";
import contractABI from '@/contracts/TalentoTechAbi.json';

const smartContract = {
  address: import.meta.env.VITE_CONTRACT_ADDRESS || '0x850A514822A81f2Ed0fEa5dDcc3A703E9D3d7345',
  abi: contractABI,
} as const;

//✅ Obtener el owner del contrato
export const useOwner = () => {
  return useReadContract({
    ...smartContract,
    functionName: "owner",
  });
};

//✅ Obtener el precio de los NFT
export const usePrice = () => {
  return useReadContract({
    ...smartContract,
    functionName: "getPrice",
  });
};

//✅ Obtener la URL de cada NFT.
export const useTokenURI = () => {
  return useReadContracts({
    contracts: [
      {
        ...smartContract,
        functionName: "tokenURI",
        args: [1],
      },
      {
        ...smartContract,
        functionName: "tokenURI",
        args: [2],
      },
      {
        ...smartContract,
        functionName: "tokenURI",
        args: [3],
      },
      {
        ...smartContract,
        functionName: "tokenURI",
        args: [4],
      },
      {
        ...smartContract,
        functionName: "tokenURI",
        args: [5],
      },
      {
        ...smartContract,
        functionName: "tokenURI",
        args: [6],
      },
      {
        ...smartContract,
        functionName: "tokenURI",
        args: [7],
      },
      {
        ...smartContract,
        functionName: "tokenURI",
        args: [8],
      },
      {
        ...smartContract,
        functionName: "tokenURI",
        args: [9],
      },
      {
        ...smartContract,
        functionName: "tokenURI",
        args: [10],
      },
      {
        ...smartContract,
        functionName: "tokenURI",
        args: [11],
      },
    ]
  });
};

//✅ Obtener el comprador de un NFT
export const useOwnerOf = () => {
  return useReadContracts({
    contracts: [
      {
        ...smartContract,
        functionName: "ownerOf",
        args: [1],
      },
      {
        ...smartContract,
        functionName: "ownerOf",
        args: [2],
      },
      {
        ...smartContract,
        functionName: "ownerOf",
        args: [3],
      },
      {
        ...smartContract,
        functionName: "ownerOf",
        args: [4],
      },
      {
        ...smartContract,
        functionName: "ownerOf",
        args: [5],
      },
      {
        ...smartContract,
        functionName: "ownerOf",
        args: [6],
      },
      {
        ...smartContract,
        functionName: "ownerOf",
        args: [7],
      },
      {
        ...smartContract,
        functionName: "ownerOf",
        args: [8],
      },
      {
        ...smartContract,
        functionName: "ownerOf",
        args: [9],
      },
      {
        ...smartContract,
        functionName: "ownerOf",
        args: [10],
      },
      {
        ...smartContract,
        functionName: "ownerOf",
        args: [11],
      },
    ],
  });
};