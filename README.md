# Marketplace de NFTs Talento Tech Bogotá

A continuación encontrarán la información necesaria que les permitirá probar el sitio web en producción. Los requisitos para poder interactuar correctamente son:

- Tener una wallet, por ejemplo MetaMask, con ETH en la testnet de Sepolia. En caso de no tener ETH de prueba, pueden solicitarlo en el siguiente enlace: [Faucet de Sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia).

- Visitar cualquiera de estos dos enlaces donde está alojado el proyecto:
  - [Opción centralizada con Vercel](https://nft-marketplace-talento-tech.vercel.app/)
  - [Opción descentralizada con Fleek e IPFS](https://marketplace-talento-tech.on-fleek.app/)

## Requisitos para clonar el proyecto

- Contar con NodeJS con una versión superior a la 18.
- Conocimientos básicos de la terminal.

Ejecuten los siguientes comandos:

```bash
git clone https://github.com/HardmandDev/Nft-Marketplace-TalentoTech.git
```
```bash
cd Nft-Marketplace-TalentoTech
```
```bash
npm install
```
```bash
npm run dev
```

**NOTA:** No se requieren variables de entorno. El proyecto está desarrollado con Wagmi y Viem, los cuales funcionan muy diferente a ethers. Por ejemplo, cuando se da clic en "Desconectar wallet", realmente se desconecta incluso si se recarga el sitio web.

En los archivos /src/hook/*, está la dirección del Smart Contract en caso de querer cambiarlo.

En la raíz del proyecto encontrarán la carpeta contracts con los archivos empleados para realizar las pruebas al Smart Contract con Foundry.
