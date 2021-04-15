import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js'
import Home from '@/components/Home';
import Login from '@/components/Login';
import ActivityFeed from '@/components/ActivityFeed';
import AboutUs from '@/components/AboutUs';
import Explore from '@/components/Explore';
import PendingPools from '@/components/PendingPools';
import SetPassword from '@/components/SetPassword';
import PoolGroupsPage from '@/components/PoolGroupsPage';
import UserProfle from '@/components/UserProfile';
import Statistics from '@/components/Statistics';
import CreateSubscription from '@/components/CreateSubscription';
import Logout from '@/components/Logout';
import PaymentSetup from '@/components/PaymentSetup';
import CreatePoolGroup from '@/components/CreatePoolGroup';

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
            path: '/explore',
            name: 'Explore',
            component: Explore,
            props: true,
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
            name: 'UserProfle',
            component: UserProfle,
            props: true,
        },
        {
            path: '/statistics',
            name: 'Statistics',
            component: Statistics,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/create-subscription',
            name: 'CreateSubscription',
            component: CreateSubscription,
            props: true,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/logout',
            name: Logout,
            component: Logout,
        }, {
            path: '/payment-setup',
            name: 'PaymentSetup',
            component: PaymentSetup,
        }, {
            path: '/create-pool',
            name: 'CreatePoolGroup',
            component: CreatePoolGroup,
            meta: {
                requiresAuth: true
            }
        },

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