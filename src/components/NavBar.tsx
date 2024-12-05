import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link } from "@nextui-org/react";
import { useAccount, useDisconnect, useConnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import ConstantRoutes from '@/constants/ConstantsRoutes'

const NavBar = () => {
    const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();
    const { connectors, connect } = useConnect();
    const navigate = useNavigate();

    const handleDisconnect = () => {
        disconnect();
        navigate(ConstantRoutes.HOME);
        console.log('Desconectado')
    };

    return (
        <Navbar>
            <NavbarBrand>
                <Link href={ConstantRoutes.HOME} className="font-bold text-inherit">NFTs Talento Tech!</Link>
            </NavbarBrand>
            <NavbarContent justify="end">
                {isConnected ? (
                    <>
                        <NavbarItem>
                            <Link href={ConstantRoutes.HOME}>Inicio</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href={ConstantRoutes.MARKETPLACE}>Tienda</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href={ConstantRoutes.DASHBOARD}>Perfil</Link>
                        </NavbarItem>
                        {/* <NavbarItem>
                            <Link href={ConstantRoutes.SETTINGS}>Ajustes</Link>
                        </NavbarItem> */}
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
                                onClick={() => connect({ connector: connectors[0] })}
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
