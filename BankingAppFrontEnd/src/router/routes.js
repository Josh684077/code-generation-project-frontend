import BankingAppLayout from 'layouts/BankingAppLayout.vue'
import IndexPage from 'pages/IndexPage.vue'
import AccountsOverviewPage from 'pages/AccountsOverviewPage.vue'
import RegistrationPage from 'pages/RegistrationPage.vue'
import LoggedUserPage from 'pages/LoggedUserPage.vue'

const routes = [{
        path: '/',
        component: () => BankingAppLayout,
        children: [
            { path: '', component: () => IndexPage },
            { path: '/accounts', component: () => AccountsOverviewPage },
            { path: '/register', component: () => RegistrationPage },
            { path: '/overview', component: () => LoggedUserPage },

            {
                path: '/users',
                component: () =>
                    import ('pages/UsersOverviewPage.vue')
            },
            {
                path: '/transfer/:iban',
                component: () =>
                    import ('pages/TransferPage.vue'),
                props: true
            },
        ]
    },

    // Always leave this last one for 404
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/ErrorNotFound.vue')
    }
]

export default routes
