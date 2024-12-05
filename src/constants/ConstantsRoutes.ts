const createRoute = (path: string) => `/app/${path}`;

const ConstantRoutes = {
    // Public routes
    HOME: '/',

    // Private routes
    APP: 'app',
    DASHBOARD: createRoute('dashboard'),
    MARKETPLACE: createRoute('marketplace'),
    PURCHASE_HISTORY: createRoute('purchase-history'),
    SETTINGS: createRoute('settings'),
};

export default ConstantRoutes;
