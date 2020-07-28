import Vue from 'vue'
import Router from 'vue-router';

import Home from "@/views/Home";
import InscriptionConnexion from "@/views/InscriptionConnexion";
import PageErreur from "@/views/PageErreur";
import AjoutArticle from "@/views/Article";
import ArticlesList from "@/views/ArticlesList";

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
            path: '/ajoutArticle',
            name: 'ajoutArticle',
            component: AjoutArticle
        },
        {
            path: '/articles',
            name: 'articlesList',
            component: ArticlesList
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