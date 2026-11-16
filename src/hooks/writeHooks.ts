import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { smartContract } from '@/config/contract';

interface TxParams {
  functionName: string;
  args?: readonly unknown[];
  value?: bigint;
}

// Envía una transacción y expone su ciclo de vida: firma en la wallet, confirmación y resultado.
// Al confirmarse se invalidan las lecturas del contrato para que la UI muestre el estado nuevo.
const useContractTx = () => {
  const queryClient = useQueryClient();
  const { writeContractAsync, data: hash, isPending, error: writeError } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  const reverted = receipt.data?.status === 'reverted';
  const isSuccess = receipt.isSuccess && !reverted;

  const isFinished = isSuccess || reverted;

  // También si revierte: el estado de la cadena pudo cambiar (por ejemplo, otro usuario compró antes).
  useEffect(() => {
    if (isFinished) {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'readContract' || query.queryKey[0] === 'readContracts',
      });
    }
  }, [isFinished, queryClient]);

  const send = async (params: TxParams) => {
    try {
      await writeContractAsync({ ...smartContract, ...params });
    } catch {
      // El error (por ejemplo, rechazo en la wallet) queda disponible en `error`.
    }
  };

  const error = writeError ?? receipt.error ?? (reverted ? new Error('El contrato revirtió la transacción.') : null);

  return { send, hash, isPending, isConfirming: receipt.isLoading, isSuccess, error };
};

//✅ Si el usuario es el propietario, permite retirar el saldo acumulado de las ventas de NFTs.
export const useWithdraw = () => {
  const { send, ...tx } = useContractTx();

  const withdraw = () => send({ functionName: "withdraw" });

  return { withdraw, ...tx };
};

//✅ Si el usuario es el propietario, permite establecer el precio de TODOS los NFTs.
export const useSetPrice = () => {
  const { send, ...tx } = useContractTx();

  const setPrice = (newPrice: bigint) =>
    send({ functionName: "setPrice", args: [newPrice] });

  return { setPrice, ...tx };
};

//✅ Permite comprar un NFT.
export const useBuyNFT = () => {
  const { send, ...tx } = useContractTx();

  const buyNFT = (tokenId: number, price: bigint) =>
    send({ functionName: "buyNFT", args: [BigInt(tokenId)], value: price });

  return { buyNFT, ...tx };
};
