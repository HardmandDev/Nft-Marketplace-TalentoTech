/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Dirección del contrato TalentoTech (opcional; por defecto el desplegado en Sepolia). */
  readonly VITE_CONTRACT_ADDRESS?: string;
  /** URL de RPC de Sepolia (opcional; por defecto el RPC público de viem). */
  readonly VITE_SEPOLIA_RPC_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
