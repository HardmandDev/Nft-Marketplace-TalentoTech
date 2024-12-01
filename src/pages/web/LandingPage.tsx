import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import ConstantRoutes from "@/constants/ConstantsRoutes";
import ConstantsApp from "@/constants/ConstantsApp";

const LandingPage = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const navigate = useNavigate(); // Para redirigir cuando el usuario conecta su wallet

    // Este useEffect se podría simplificar si se maneja el estado de la wallet en el Navbar
    useEffect(() => {
        const savedWalletAddress = localStorage.getItem(ConstantsApp.LOCAL_STORAGE_WALLET_ADDRESS);
        if (savedWalletAddress) {
            setWalletAddress(savedWalletAddress); // Recuperar la wallet de localStorage (si ya está conectada)
        }
    }, []);

    // Si el usuario está conectado, redirigir automáticamente al Dashboard
    useEffect(() => {
        if (walletAddress) {
            navigate(ConstantRoutes.DASHBOARD); // Redirige automáticamente al dashboard
        }
    }, [walletAddress, navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Bienvenido a nuestro Marketplace de NFTs</h1>
            <p>Conecta tu wallet para empezar a explorar, comprar y vender NFTs exclusivos.</p>
            {!walletAddress ? (
                <>
                    <Button
                        color="primary"
                        variant="flat"
                        onClick={() => navigate(ConstantRoutes.DASHBOARD)} // Redirigir al Dashboard si el usuario está conectado
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
