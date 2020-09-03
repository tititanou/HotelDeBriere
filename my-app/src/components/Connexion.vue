<template>
    <div>
        <b-card-group deck>
            <b-card title="Formulaire de connexion" class="mb-3">
                <b-card-text>
                    <div v-if="error" class="alert alert-danger">{{error}}</div>
                        <label class="col-4" for="email">Email:</label>
                        <input type="email" id="email" name="email" class="form-control  col-8 " required v-model="form.email" placeholder="Votre adresse mail">
                        <label class="mt-3 col-4" for="password">Mot de passe:</label>
                        <input type="password" id="password" name="password" class="form-control  col-8 " required v-model="form.password" placeholder="Choisissez votre mot de passe">
                        <b-button class="mt-3 btn-valid" type="submit" @click="connexion">Se connecter</b-button>
                </b-card-text>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
import firebase from "firebase";
export default{
    name: 'connexion',
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            error: null
        };
    },
    methods: {
        connexion() {
            firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
            .then(()=>{
                alert("Vous êtes connecté.")
                this.$router.replace({ name: "profile" })
            })
            .catch(function(err) {
                alert("Une erreur s'est produite")
                this.data.error = err.message;
            });
        },
    },
}
</script>

<style scoped>
@import "../assets/custom.scss";
</style>