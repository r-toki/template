import { Home } from '@/pages/Home';
import { Settings } from '@/pages/Settings';

export const protectedRoutes = [
  { path: '/home', element: <Home /> },
  { path: '/settings', element: <Settings /> },
];
