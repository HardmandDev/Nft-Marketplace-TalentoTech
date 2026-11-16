import { Link } from 'react-router-dom';
import ConstantsRoutes from '@/constants/ConstantsRoutes';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <p className="my-4">La dirección que buscas no existe.</p>
      <Link to={ConstantsRoutes.HOME} className="underline">Volver al inicio</Link>
    </div>
  )
}

export default NotFoundPage
