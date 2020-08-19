<template>
    <div>
        <b-card-group deck>
            <b-card title="Formulaire d'inscription" class="mb-3">
                <b-card-text>
                    <div v-if="error" class="alert alert-danger">{{error}}</div>
                        <label  class="col-4" for="email">Email:</label>
                        <input type="email" id="email" name="email" class="form-control  col-8 " required v-model="form.email" placeholder="Votre adresse mail">
                        <label class="mt-3 col-4" for="password">Mot de passe:</label>
                        <input type="password" id="password" name="password" class="form-control  col-8 " required v-model="form.password" placeholder="Choisissez votre mot de passe">
                        <label class="mt-3 col-4" for="confirmPassword">Mot de passe:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" class="form-control  col-8 " v-model="form.confirmPassword" placeholder="Confirmez votre mot de passe">
                        <b-button class="mt-3" type="submit" @click="inscription" variant="primary">S'inscrire</b-button>
                </b-card-text>
                
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
import firebase from "firebase";
export default{
    name: 'inscription',
    data() {
        return {
            form: {
                email: "",
                password: "",
                confirmPassword: ""
            },
            error: null
        };
    },
    methods: {
        inscription() {
            if(this.verifPw() == true){
                firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
                .then(() =>{
                    alert("Vous êtes maintenant inscrit.")
                    this.$router.replace({ name: "profile" })
                })
                .catch(function(err) {
                    alert("Une erreur s'est produite.")
                    this.data.error = err.message;
                });
            }
            else{
                alert("Les mots de passe sont différents.")
            }
        },
        verifPw(){
            if (this.form.password === this.form.confirmPassword){
                return true;
            }else{
                return false;
            }
        }
    },
}
</script>

<style scoped>
     
</style>