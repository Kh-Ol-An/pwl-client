import Welcome from './Welcome/Welcome';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import Home from './Home/Home';
import Settings from './Settings/Settings';
import Auth from './Auth/Auth';

export const publicRoutes = [
    { path: '/welcome', component: Welcome },
    { path: '/*', component: NotFoundPage },
];

export const privateRoutes = [
    { path: '/', component: Home },
    { path: '/settings', component: Settings },
];

export const unauthenticatedRoutes = [
    { path: '/auth', component: Auth },
];
