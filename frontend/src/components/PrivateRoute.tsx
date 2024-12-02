import { Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi'; // Para verificar si la wallet está conectada
import ConstantsRoutes from '@/constants/ConstantsRoutes'

// Componente que protegerá las rutas privadas
function PrivateRoute ({ element }: { element: JSX.Element }) {
  const { isConnected } = useAccount(); // Verifica si la wallet está conectada

  // Si no está conectado, redirige a la página de inicio
  if (!isConnected) {
    return <Navigate to={ConstantsRoutes.HOME} replace />;
  }

  // Si está conectado, renderiza el componente que corresponde
  return element;
};

export default PrivateRoute;
