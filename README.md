# Marketplace de NFTs Talento Tech Bogotá

Marketplace de NFTs (ERC-721) en la testnet Sepolia. El frontend usa React, Vite, wagmi y viem. El smart contract está en Solidity y se prueba con Foundry. No hay backend ni base de datos: el estado vive en el contrato y los metadatos de los NFTs en IPFS (Pinata).

## Probar el sitio en producción

- Ten una wallet, por ejemplo MetaMask, con ETH en Sepolia. Si no tienes ETH de prueba, pídelo en el [Faucet de Sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia).
- Entra en cualquiera de los dos despliegues:
  - [Opción centralizada con Vercel](https://nft-marketplace-talento-tech.vercel.app/)
  - [Opción descentralizada con Fleek e IPFS](https://marketplace-talento-tech.on-fleek.app/)

## Estructura

```
src/
  config/        wagmi.ts (red y RPC) y contract.ts (dirección y ABI del contrato)
  contracts/     TalentoTechAbi.json (ABI generado por `forge build`)
  hooks/         lecturas (readHooks, useNfts) y escrituras (writeHooks) del contrato
  pages/         landing, marketplace, dashboard (owner y usuario), 404
  components/    NavBar, guardas de rutas (PrivateRoute, AppRedirect), TxStatus
  utils/         validación de precio, metadatos seguros y mensajes de error
contracts/       proyecto Foundry: src/, test/, script/
```

## Desarrollo del frontend

Requisitos: Node.js 20 o superior (react-router 7 lo exige; probado con Node 22) y npm.

```bash
git clone https://github.com/HardmandDev/Nft-Marketplace-TalentoTech.git
cd Nft-Marketplace-TalentoTech
npm ci          # instala exactamente las versiones de package-lock.json
npm run dev     # servidor de desarrollo
npm run lint    # ESLint
npm run build   # comprobación de tipos (tsc) y build de producción en dist/
```

### Variables de entorno (opcionales)

Créalas en un archivo `.env.local`, que git ignora. Las dos son públicas: Vite las incluye en el bundle, así que **nunca pongas secretos en variables `VITE_*`**.

| Variable | Por defecto | Uso |
|---|---|---|
| `VITE_CONTRACT_ADDRESS` | `0x850A514822A81f2Ed0fEa5dDcc3A703E9D3d7345` | Dirección del contrato. Si no es una dirección válida, la app no arranca. |
| `VITE_SEPOLIA_RPC_URL` | RPC público de viem | RPC de Sepolia. Recomendado en producción, porque el RPC público limita las peticiones. |

La dirección del contrato solo se define en `src/config/contract.ts`.

**Sobre `VITE_SEPOLIA_RPC_URL`:** las URLs de Alchemy o Infura suelen incluir la API key, y esa URL termina en el bundle público. Usa una key restringida a tu dominio (allowlist de origen en el panel del proveedor) o un endpoint que no contenga secretos.

> **Contrato desplegado y contrato del repo.** La dirección por defecto (`0x850A…7345`) es el contrato **anterior**, que no tiene `setListed`, `proceedsOf` ni pago al vendedor. El código de `contracts/` y el ABI de `src/contracts/TalentoTechAbi.json` corresponden al contrato **nuevo**. El frontend funciona con ambos, porque solo usa funciones comunes (`owner`, `getPrice`, `ownerOf`, `tokenURI`, `buyNFT`, `setPrice`, `withdraw`). Para usar el contrato nuevo hay que desplegarlo y fijar `VITE_CONTRACT_ADDRESS` (ver [Despliegue](#despliegue)).

## Smart contract (Foundry)

Requisitos: [Foundry](https://getfoundry.sh). Las librerías de Solidity (OpenZeppelin 5.1.0 y forge-std 1.9.4) se instalan con npm dentro de `contracts/`.

```bash
cd contracts
npm ci          # OpenZeppelin y forge-std en contracts/node_modules
forge build
forge test
```

Al cambiar el contrato, regenera el ABI que usa el frontend:

```bash
cd contracts && forge build
node -e "const a=require('./out/TalentoTech.sol/TalentoTech.json').abi;require('fs').writeFileSync('../src/contracts/TalentoTechAbi.json',JSON.stringify(a,null,'\t')+'\n')"
```

### Cómo funciona el contrato

- El propietario (`owner`) mintea NFTs con `mint()`. Cada NFT queda en venta al precio global `price`.
- `buyNFT(tokenId)` compra un NFT en venta pagando exactamente `price`. El pago se acredita al vendedor.
- El dueño de un NFT lo pone en venta o lo retira con `setListed(tokenId, bool)`. Cualquier transferencia lo retira de la venta.
- Cada vendedor retira sus ganancias con `withdraw()`. Puede consultarlas con `proceedsOf(address)`.
- Solo el owner puede cambiar el precio (`setPrice`, siempre mayor que 0).
- El traspaso de propiedad es en dos pasos (`Ownable2Step`): `transferOwnership(nueva)` y después `acceptOwnership()` desde la nueva cuenta. `renounceOwnership()` está deshabilitado y siempre revierte.

### Despliegue

El script `contracts/script/TalentoTech.s.sol` despliega el contrato con un precio inicial de 0.1 ETH y con el owner fijado en la variable `initialOwner`. **Antes de desplegar, cambia `initialOwner` por la dirección que será owner.** Esa cuenta es la única que podrá mintear, cambiar el precio y retirar lo de la venta inicial. La cuenta que firma el despliegue puede ser otra.

Firma con una wallet guardada en el keystore de Foundry o con una hardware wallet. **No pases la clave privada con `--private-key`**, porque queda en el historial de la terminal.

```bash
cast wallet import deployer --interactive   # una sola vez: guarda la clave cifrada
export SEPOLIA_RPC_URL="https://..."         # RPC de Sepolia para desplegar (no es la variable VITE_*)
cd contracts
forge script script/TalentoTech.s.sol --rpc-url "$SEPOLIA_RPC_URL" --account deployer --broadcast
```

Después de desplegar:
1. Mintea los NFTs desde la cuenta owner. No hay interfaz para mintear; usa `cast`: `cast send <dirección> "mint()" --rpc-url "$SEPOLIA_RPC_URL" --account owner`.
2. Configura `VITE_CONTRACT_ADDRESS` con la nueva dirección en Vercel o Fleek.
3. Si cambió el contrato, regenera `src/contracts/TalentoTechAbi.json`.

Las cabeceras de seguridad (`X-Frame-Options`, `X-Content-Type-Options` y otras) se configuran en `vercel.json` y **solo se aplican en Vercel**. El despliegue en Fleek/IPFS no las usa.

## Limitaciones conocidas

- El frontend consulta los IDs 1 a 50 (`MAX_TOKEN_ID` en `src/config/contract.ts`), porque el contrato no expone el total de NFTs. Si hay más, sube ese valor.
- Todavía no hay interfaz para poner en venta ni para retirar ganancias de quien no es owner. Esas acciones solo están disponibles desde el contrato.
- El precio es único para todos los NFTs.
- Los metadatos dependen de un gateway de Pinata fijado en el contrato.
