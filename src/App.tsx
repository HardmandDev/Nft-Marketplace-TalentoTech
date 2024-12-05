import { StrictMode } from 'react';
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextUIProvider } from '@nextui-org/react';
import { RouterProvider } from 'react-router-dom';

import { config } from '@/config/wagmi'
import { router } from '@/routers'

const queryClient = new QueryClient()

export default function App() {
  return (
    <StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider navigate={router.navigate}>
            <RouterProvider router={router} />
          </NextUIProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </StrictMode>
  );
}