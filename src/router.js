import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js'
import Home from '@/components/Home';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import Landing from '@/components/Landing';
import ActivityFeed from '@/components/ActivityFeed';
import AboutUs from '@/components/AboutUs';
import ContactUs from '@/components/ContactUs';
import Explore from '@/components/Explore';
import PendingPools from '@/components/PendingPools';
import SetPassword from '@/components/SetPassword';
import SearchPoolPage from '@/components/SearchPoolPage';
import PoolGroupsPage from '@/components/PoolGroupsPage';
import UserProfle from '@/components/UserProfile';
import Statistics from '@/components/Statistics';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/explore'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/landing',
            name: 'Landing',
            component: Landing
        },
        {
            path: '/sign-up',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/activity-feed',
            name: 'ActivityFeed',
            component: ActivityFeed,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/about-us',
            name: 'AboutUs',
            component: AboutUs,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/contact-us',
            name: 'ContactUs',
            component: ContactUs,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/explore',
            name: 'Explore',
            component: Explore,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/pending-pools',
            name: 'PendingPools',
            component: PendingPools,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/set-password',
            name: 'SetPassword',
            component: SetPassword,
        },
        {
            path: '/search-service',
            name: 'SearchService',
            component: SearchPoolPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/pool-groups',
            name: 'PoolGroups',
            component: PoolGroupsPage,
            props: true,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/user-profile',
            name: UserProfle,
            component: UserProfle,
            props: true,
        },
        {
            path: '/statistics',
            name: Statistics,
            component: Statistics
        }
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth) {
        if (!store.state.user) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
});

export default router;