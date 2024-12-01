import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import ConstantRoutes from "@/constants/ConstantsRoutes";
import ConstantsApp from "@/constants/ConstantsApp";

const LandingPage = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedWalletAddress = localStorage.getItem(ConstantsApp.LOCAL_STORAGE_WALLET_ADDRESS);
        if (savedWalletAddress) {
            setWalletAddress(savedWalletAddress);
        }
    }, []);

    useEffect(() => {
        if (walletAddress) {
            navigate(ConstantRoutes.DASHBOARD);
        }
    }, [walletAddress, navigate]);

    const handleConnectWallet = () => {
        const connectedWalletAddress = "0x1234567890abcdef"; // Simula la dirección conectada
        localStorage.setItem(ConstantsApp.LOCAL_STORAGE_WALLET_ADDRESS, connectedWalletAddress);
        setWalletAddress(connectedWalletAddress); // Actualizar el estado
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Bienvenido a nuestro Marketplace de NFTs</h1>
            <p>Conecta tu wallet para empezar a explorar, comprar y vender NFTs exclusivos.</p>
            {!walletAddress ? (
                <>
                    <Button
                        color="primary"
                        variant="flat"
                        onClick={handleConnectWallet}
                    >
                        Conectar Wallet
                    </Button>
                    <p>¡Haz clic en el botón para conectar tu wallet y comenzar!</p>
                </>
            ) : (
                <p>¡Tu wallet está conectada! Redirigiendo a tu Dashboard...</p>
            )}
        </div>
    );
};

export default LandingPage;
