import { createBrowserRouter } from "react-router-dom";
import ConstantsRoutes from "@/constants/ConstantsRoutes";
import LayoutPublic from "@/layouts/LayoutPublic";
import NotFoundPage from "@/pages/notFoundPage/NotFoundPage";
import LandingPage from "@/pages/web/LandingPage";

import LayoutPrivate from "@/layouts/LayoutPrivate";
import Dashboard from "@/pages/dashboard/Dashboard";
import MarketplacePage from "@/pages/marketplace/MarketplacePage";
import MyNftsPage from "@/pages/myNfts/MyNftsPage";
import PurchaseHistoryPage from "@/pages/purchaseHistory/PurchaseHistoryPage";
import SettingsPage from "@/pages/settings/SettingsPage";

export const router = createBrowserRouter([
    {
        path: ConstantsRoutes.HOME,
        element: <LayoutPublic />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <LandingPage />
            }
        ]
    },
    {
        path: ConstantsRoutes.APP, // Prefijo común para rutas autenticadas
        element: <LayoutPrivate />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: ConstantsRoutes.DASHBOARD, // Panel de usuario
                index: true,
                element: <Dashboard />
            },
            {
                path: ConstantsRoutes.MARKETPLACE, // Marketplace
                element: <MarketplacePage />
            },
            {
                path: ConstantsRoutes.MY_NFTS, // Mis NFTs
                element: <MyNftsPage />
            },
            {
                path: ConstantsRoutes.PURCHASE_HISTORY, // Historial de compras
                element: <PurchaseHistoryPage />
            },
            {
                path: ConstantsRoutes.SETTINGS, // Ajustes
                element: <SettingsPage />
            }
        ]
    }
]);
