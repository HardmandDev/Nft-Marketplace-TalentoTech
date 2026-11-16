import { Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import ConstantsRoutes from '@/constants/ConstantsRoutes';

// Componente para redirigir al usuario según su estado de conexión
const AppRedirect = () => {
  const { status } = useAccount();

  // Esperar a que wagmi termine de reconectar antes de decidir a dónde ir
  if (status === 'connecting' || status === 'reconnecting') {
    return <div className="p-4">Conectando wallet...</div>;
  }

  // Si no está conectado, redirige a la página de inicio
  if (status === 'disconnected') {
    return <Navigate to={ConstantsRoutes.HOME} replace />;
  }

  // Si está conectado, redirige al dashboard
  return <Navigate to={ConstantsRoutes.DASHBOARD} replace />;
};

export default AppRedirect;
