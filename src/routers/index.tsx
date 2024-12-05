import { createBrowserRouter } from "react-router-dom";
import ConstantsRoutes from "@/constants/ConstantsRoutes";
import LayoutPublic from "@/layouts/LayoutPublic";
import NotFoundPage from "@/pages/notFoundPage/NotFoundPage";
import LandingPage from "@/pages/web/LandingPage";

import LayoutPrivate from "@/layouts/LayoutPrivate";
import Dashboard from "@/pages/dashboard/Dashboard";
import MarketplacePage from "@/pages/marketplace/MarketplacePage";
import PurchaseHistoryPage from "@/pages/purchaseHistory/PurchaseHistoryPage";
import SettingsPage from "@/pages/settings/SettingsPage";

import PrivateRoute from "@/components/PrivateRoute";
import AppRedirect from "@/components/AppRedirect";

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
        path: ConstantsRoutes.APP, // Ruta para redirigir a dashboard o inicio
        element: <AppRedirect />, // Usamos el componente de redirección
    },
    {
        path: ConstantsRoutes.APP, // Todas las rutas bajo /app
        element: <LayoutPrivate />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: ConstantsRoutes.DASHBOARD,
                index: true,
                element: <PrivateRoute element={<Dashboard />} />
            },
            {
                path: ConstantsRoutes.MARKETPLACE,
                element: <PrivateRoute element={<MarketplacePage />} />
            },
            {
                path: ConstantsRoutes.PURCHASE_HISTORY,
                element: <PrivateRoute element={<PurchaseHistoryPage />} />
            },
            {
                path: ConstantsRoutes.SETTINGS,
                element: <PrivateRoute element={<SettingsPage />} />
            }
        ]
    }
]);
