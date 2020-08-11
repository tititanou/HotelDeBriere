import Vue from 'vue'
import Router from 'vue-router';

import Home from "@/views/Home";
import InscriptionConnexion from "@/views/InscriptionConnexion";
import PageErreur from "@/views/PageErreur";
import NewArticle from "@/views/NewArticle";
import Profile from "@/views/ProfilePage";
import Admin from "@/views/Admin";
import ArticlesList from "@/views/ArticlesList";
import ChoosenArticle from "@/views/ChoosenArticle";

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
            path: '/profil',
            name: 'profile',
            component: Profile
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin
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
            path: '/article:id',
            name: 'completeArticle',
            component: ChoosenArticle,
            props: true
        },
        {
            path: '*',
            redirect: { name: '404' }
        },
        {
            path: '/newArticle',
            name: 'newArticle',
            component: NewArticle,
        },
        
    ]

})