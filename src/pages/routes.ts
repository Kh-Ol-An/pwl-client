import Main from '@/pages/Main';
import ActivationLinkExpired from '@/pages/ActivationLinkExpired';
import Auth from '@/pages/Auth';
import ChangeForgottenPassword from '@/pages/ChangeForgottenPassword';
import Welcome from '@/pages/Welcome';
import Instruction from '@/pages/Instruction';
import AboutOld from "@/pages/About";
import Wish from '@/pages/Wish';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import NotFound from '@/pages/NotFound';

export const privateRoutes = [
    { path: '/activation-link-expired', component: ActivationLinkExpired },
];

export const unauthenticatedRoutes = [
    { path: '/auth', component: Auth },
    { path: '/change-forgotten-password/:passwordResetLink', component: ChangeForgottenPassword },
];

export const publicRoutes = [
    { path: '/', component: Main },
    { path: '/welcome', component: Welcome },
    { path: '/instruction', component: Instruction },
    { path: '/about', component: AboutOld },
    { path: '/wish/:wishId', component: Wish },
    { path: '/privacy-policy', component: PrivacyPolicy },
    { path: '/*', component: NotFound },
];
