import Vue from 'vue'
import Router from 'vue-router';

import Home from "@/views/Home"
import InscriptionConnexion from "@/views/InscriptionConnexion";
import PageErreur from "@/views/PageErreur";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
            path: '/inscriptionConnexion',
            name: 'inscriptionConnexion',
            component: InscriptionConnexion
        },
        {
            path: '/404',
            name: '404',
            component: PageErreur,
        },

        {
            path: '*',
            redirect: { name: '404' }
        }
    ]

})