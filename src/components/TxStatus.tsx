import { getErrorMessage } from '@/utils/errors';

interface TxStatusProps {
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  error: Error | null;
  successMessage: string;
}

// Muestra el estado de una transacción: esperando firma, confirmando, confirmada o con error.
const TxStatus: React.FC<TxStatusProps> = ({ isPending, isConfirming, isSuccess, error, successMessage }) => {
  if (error) {
    return <p role="alert" className="text-danger my-2">No se pudo completar la transacción: {getErrorMessage(error)}</p>;
  }
  if (isPending) return <p role="status" className="my-2">Confirma la transacción en tu wallet...</p>;
  if (isConfirming) return <p role="status" className="my-2">Esperando confirmación en la red...</p>;
  if (isSuccess) return <p role="status" className="text-success my-2">{successMessage}</p>;
  return null;
};

export default TxStatus;
