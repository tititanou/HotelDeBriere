import Vue from 'vue'
import VueRouter from 'vue-router';
import firebase from 'firebase';
import Home from "@/views/Home";
import InscriptionConnexion from "@/views/InscriptionConnexion";
import PageErreur from "@/views/PageErreur";
import NewArticle from "@/views/NewArticle";
import Profile from "@/views/ProfilePage";
import Admin from "@/views/Admin";
import AdminsManage from "@/views/AdminsList";
import ArticlesList from "@/views/ArticlesList";
import ChoosenArticle from "@/views/ChoosenArticle";
import EditArticle from "@/views/EditArticle";
import ModifyingArticle from "@/views/ModifyingArticle";
import NewEvent from "@/views/NewEvent";
import EventList from "@/views/EventList";
import ChoosenEvent from "@/views/ChoosenEvent";
import ModifyingEvent from "@/views/ModifyingEvent";
import EditEvent from "@/views/EditEvent";
import MoreAbout from "@/views/MoreAbout.vue";
import FilteredArticles from "@/views/FilteredArticles.vue";
import "firebase/auth";

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
},
{
    path: '/enSavoirPlus',
    name: 'enSavoirPlus',
    component: MoreAbout
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
    path: '/gestionAdmins',
    name: 'adminsManage',
    component: AdminsManage,
},
{
    path: '/articles',
    name: 'articlesList',
    component: ArticlesList,
},
{
    path: '/events',
    name: 'eventList',
    component: EventList,
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
    path: '/event:id',
    name: 'completeEvent',
    component: ChoosenEvent,
    props: true
},
{
    path: '*',
    name: 'filteredArticles',
    component: FilteredArticles,
},
{
    path: '/newArticle',
    name: 'newArticle',
    component: NewArticle,
},
{
    path: '/editArticle',
    name: 'editArticle',
    component: EditArticle,
},
{
    path: '/editEvent',
    name: 'editEvent',
    component: EditEvent,
},
{
    path: '/modifyingArticle:id',
    name: 'modifyingArticle',
    component: ModifyingArticle,
    props: true
},
{
    path: '/modifyingEvent:id',
    name: 'modifyingEvent',
    component: ModifyingEvent,
    props: true
},
{
    path: '/newEvent',
    name: 'newEvent',
    component: NewEvent,
}
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = firebase.auth().currentUser;
    console.log("isauthenticated", isAuthenticated);
    if (requiresAuth && !isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

export default router;