import { Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import ConstantsRoutes from '@/constants/ConstantsRoutes'

// Componente que protegerá las rutas privadas
function PrivateRoute ({ element }: { element: JSX.Element }) {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <Navigate to={ConstantsRoutes.HOME} replace />;
  }
  
  return element;
};

export default PrivateRoute;
