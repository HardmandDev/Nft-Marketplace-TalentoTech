import { Button, Link } from "@nextui-org/react";
import { useAccount, useConnect } from 'wagmi';
import ConstantRoutes from "@/constants/ConstantsRoutes";

const LandingPage = () => {
    const { isConnected } = useAccount();
    const { connectors, connect, error } = useConnect();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Bienvenido Marketplace de NFTs de Talento Tech Bogotá</h1>

            <p className="mt-4">Realizado por: Armando Velasquez</p>
            <p className="mb-4">en el programa de Talento Tech Bogotá</p>

            {!isConnected ? (
                <>
                    <p className='my-4'>Conecta tu wallet para empezar a explorar, comprar y vender NFTs.</p>
                    <Button
                        color="primary"
                        variant="flat"
                        onClick={() => connect({ connector: connectors[0] })}
                    >
                        Conectar Wallet
                    </Button>
                </>
            ) : (
                <>
                    <p className='my-4'>¡Tu wallet está conectada!</p>
                    <Button color="secondary" variant="flat">
                        <Link href={ConstantRoutes.MARKETPLACE}>Ir a la tienda</Link>
                    </Button>
                </>
            )}

            {error && <div>{error.message}</div>}
        </div>
    );
};

export default LandingPage;
