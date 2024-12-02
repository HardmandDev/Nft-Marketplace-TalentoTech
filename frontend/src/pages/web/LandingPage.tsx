import { Button } from "@nextui-org/react";
import { useAccount, useConnect } from 'wagmi';

const LandingPage = () => {
    const { isConnected } = useAccount();  // Estado de conexión de la wallet
    const { connectors, connect, error } = useConnect();  // Para conectar la wallet

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Bienvenido a nuestro Marketplace de NFTs</h1>
            <p>Conecta tu wallet para empezar a explorar, comprar y vender NFTs exclusivos.</p>

            {!isConnected ? (
                <>
                    <Button
                        color="primary"
                        variant="flat"
                        onClick={() => connect({ connector: connectors[0] })}  // Conectar la primera wallet
                    >
                        Conectar Wallet
                    </Button>
                    <p>¡Haz clic en el botón para conectar tu wallet y comenzar!</p>
                </>
            ) : (
                <p>¡Tu wallet está conectada!</p>
            )}

            {/* Mostrar posibles errores de conexión */}
            {error && <div>{error.message}</div>}
        </div>
    );
};

export default LandingPage;
