import { Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import ConstantsRoutes from '@/constants/ConstantsRoutes'

// Componente que protegerá las rutas privadas
function PrivateRoute ({ element }: { element: JSX.Element }) {
  const { status } = useAccount();

  // Al recargar la página wagmi tarda un momento en reconectar la wallet: no hay que redirigir todavía.
  if (status === 'connecting' || status === 'reconnecting') {
    return <div className="p-4">Conectando wallet...</div>;
  }

  if (status === 'disconnected') {
    return <Navigate to={ConstantsRoutes.HOME} replace />;
  }

  return element;
};

export default PrivateRoute;
