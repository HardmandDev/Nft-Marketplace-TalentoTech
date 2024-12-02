import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link } from "@nextui-org/react";
import { useAccount, useDisconnect, useConnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import ConstantRoutes from '@/constants/ConstantsRoutes'

const NavBar = () => {
    const { isConnected, address } = useAccount(); // Estado de conexión de la wallet
    const { disconnect } = useDisconnect();
    const { connectors, connect } = useConnect();  // Para conectar la wallet
    const navigate = useNavigate();

    // Función para desconectar y redirigir al inicio
    const handleDisconnect = () => {
        disconnect();  // Desconectar wallet
        navigate(ConstantRoutes.HOME);  // Redirigir al inicio
        console.log('Desconectado')
    };

    return (
        <Navbar>
            <NavbarBrand>
                <Link href={ConstantRoutes.HOME} className="font-bold text-inherit">NM TT</Link>
            </NavbarBrand>
            <NavbarContent justify="end">
                {/* Mostrar las opciones de menú solo si el usuario está conectado */}
                {isConnected ? (
                    <>
                        <NavbarItem>
                            <Link href={ConstantRoutes.DASHBOARD}>Dashboard</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href={ConstantRoutes.MARKETPLACE}>Marketplace</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href={ConstantRoutes.MY_NFTS}>Mis NFTs</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href={ConstantRoutes.SETTINGS}>Ajustes</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <p style={{ color: "white", fontSize: "14px" }}>
                                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "No conectado"}
                            </p>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onClick={handleDisconnect} color="secondary" variant="flat">
                                Desconectar
                            </Button>
                        </NavbarItem>
                    </>
                ) : (
                    <>
                        <NavbarItem>
                            <Link href={ConstantRoutes.HOME}>Home</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                color="primary"
                                variant="flat"
                                onClick={() => connect({ connector: connectors[0] })}  // Conectar la primera wallet
                            >
                                Conectar Wallet
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
};

export default NavBar;
