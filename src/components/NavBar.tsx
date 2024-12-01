import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { connectWallet, detectWallet, getBalance } from "@/utils/wallet"; // Asegúrate de tener estas funciones ya definidas

export default function NavBar() {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<string>("");

    // Detectar wallet al cargar la página
    useEffect(() => {
        const checkWallet = async () => {
            const address = await detectWallet();
            if (address) {
                setWalletAddress(address);
                const userBalance = await getBalance(address);
                setBalance(userBalance);
            }
        };
        checkWallet();
    }, []);

    // Escuchar eventos de MetaMask
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            window.ethereum.on("accountsChanged", (accounts: string[]) => {
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    getBalance(accounts[0]).then(setBalance);
                } else {
                    disconnectWallet(); // Desconectar wallet si no hay cuentas
                }
            });

            window.ethereum.on("chainChanged", (chainId: string) => {
                console.log("Red cambiada a:", chainId);
                window.location.reload(); // Recargar para manejar cambios de red
            });
        }
    }, []);

    // Conectar wallet
    const handleConnectWallet = async () => {
        const address = await connectWallet();
        if (address) {
            setWalletAddress(address);
            const userBalance = await getBalance(address);
            setBalance(userBalance);
        }
    };

    // Desconectar wallet
    const disconnectWallet = () => {
        setWalletAddress(null);
        setBalance("");
    };

    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">Nft Marketplace Talento Tech</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                {/* Mostrar el botón de conectar wallet si no está conectado */}
                {!walletAddress ? (
                    <NavbarItem>
                        <Button onClick={handleConnectWallet} color="primary" variant="flat">
                            Conectar Wallet
                        </Button>
                    </NavbarItem>
                ) : (
                    <>
                        {/* Si está conectado, mostrar la wallet y el balance */}
                        <NavbarItem>
                            <p style={{ margin: 0, padding: 0, color: "white" }}>
                                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                            </p>
                            <p style={{ margin: 0, padding: 0, color: "white" }}>
                                Balance: {balance} ETH
                            </p>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onClick={disconnectWallet} color="secondary" variant="flat">
                                Desconectar
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
}
