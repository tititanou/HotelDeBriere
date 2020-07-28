<template>
    <b-container>
        <b-card title="Ajouter un article" class="mb-3">
                <b-card-text>
                    <div v-if="error" class="alert alert-danger">{{error}}</div>
                        <label class="col-4" for="titre">Titre:</label>
                        <input type="text" id="titre" name="titre" class="form-control  col-8 " required v-model="form.titre" placeholder="Titre de l'article">
                        <label class="mt-3 col-4" for="sous-titre">Sous-titre:</label>
                        <input type="text" id="sous-titre" name="sous-titre" class="form-control  col-8 " v-model="form.sousTitre" placeholder="Sous-titre de l'article">
                        <label class="mt-3 col-4" for="resume">Resumé:</label>
                        <b-form-textarea type="text" id="resume" name="resume" class="form-control  col-8 " required v-model="form.resume" placeholder="Entrez le résumé"/>
                        <b-button class="mt-3" @click.prevent="creerArticle" type="submit" variant="primary">Se connecter</b-button>
                </b-card-text>
            </b-card>
    </b-container>
</template>

<script>
import firebase from "firebase"
export default{
    data() {
        return {
            form: {
                titre: "",
                sousTitre: "",
                resume: ""
            },
            error: null
        };
    },
    methods: {
        creerArticle(){
            //var user = firebase.auth().currentUser;
            //console.log(user.uid);
            firebase.database().ref('articles/').push({
                titre: this.form.titre,
                sousTitre: this.form.sousTitre,
                resume : this.form.resume
            });
        }
    }
}
</script>