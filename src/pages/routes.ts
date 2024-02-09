import Welcome from './Welcome/Welcome';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import Home from './Home/Home';
import Auth from './Auth/Auth';

export const publicRoutes = [
    { path: '/welcome', component: Welcome },
    { path: '/*', component: NotFoundPage },
];

export const privateRoutes = [
    { path: '/', component: Home },
];

export const unauthenticatedRoutes = [
    { path: '/auth', component: Auth },
];
