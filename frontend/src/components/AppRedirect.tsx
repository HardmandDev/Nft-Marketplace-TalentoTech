import { Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import ConstantsRoutes from '@/constants/ConstantsRoutes';

// Componente para redirigir al usuario según su estado de conexión
const AppRedirect = () => {
  const { isConnected } = useAccount();

  // Si no está conectado, redirige a la página de inicio
  if (!isConnected) {
    return <Navigate to={ConstantsRoutes.HOME} replace />;
  }

  // Si está conectado, redirige al dashboard
  return <Navigate to={ConstantsRoutes.DASHBOARD} replace />;
};

export default AppRedirect;