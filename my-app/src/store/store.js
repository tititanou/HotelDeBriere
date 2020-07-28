import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {
            loggedIn: false,
            data: null
        },

        articles: [],
        events: [],
        selectedArticle: {},
        selectedEvent: {}

    },
    getters: {
        user(state) {
            return state.user
        },
        loggedIn(state) {
            return state.user.loggedIn
        },
        articles(state) {
            return state.articles
        },
        selectedArticle(state) {
            return state.selectedArticle
        },
        events(state) {
            return state.events
        },
        selectedEvent(state) {
            return state.selectedEvent
        }
    },
    mutations: {
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        },
        SET_ARTICLES(state, payload) {
            state.articles.push(payload);
        },
        SET_SELECTEDARTICLE(state, donnee) {
            state.selectedArticle = donnee;
        },
        SET_EVENTS(state, payload) {
            state.events.push(payload);
        },
        SET_SELECTEDEVENT(state, donnee) {
            state.selectedEvent = donnee;
        }
    },
    actions: {
        fetchUser({ commit }, user) {
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", {
                    displayName: user.displayName,
                    email: user.email
                });
            } else {
                commit("SET_USER", null);
            }
        },
        displayArticles({ commit }) {
            //var titre;
            var ref = firebase.database().ref('articles');
            ref.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    // annonces.push(childData);
                    console.log(childKey + " et " + childData.prix)
                    const article = {
                        id: childKey,
                        titre: childData.titre,
                        sousTitre: childData.sousTitre,
                        resume: childData.resume
                    }
                    commit('SET_ARTICLES', article)

                });
            });
        },
        /*getAnnonce({ commit }, categorie) {


            var ref = firebase.database().ref('/annonces');
            ref.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    const advert = {
                        id: childKey,
                        propriétaire: childData.propriétaire,
                        categorie: childData.categorie,
                        marque: childData.marque,
                        titre: childData.titre,
                        prix: childData.prix,
                        description: childData.description,
                        ville: childData.ville,
                        dateDePublication: childData.date,
                        disponibility: true,
                        imageUrl: childData.imageUrl
                    }

                    if (categorie != null) {
                        if (advert.categorie == categorie) {
                            commit('SET_ANNONCES', advert)
                        }
                    } else {
                        commit('SET_ANNONCES', advert)
                    }

                });
            });
        }*/
    }
});