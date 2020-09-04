<template>
<b-container>
    <div v-if="!isConnected">
        <div v-if="inscrit">
            <Connexion />
            <p @click="changeDisplay()">Pas encore inscrit?</p>
        </div> 
        <div v-else>
            <Inscription />
            <div @click="changeDisplay()">Déjà inscrit?</div>
        </div>
    </div>
    <div v-else>
        <p>Vous êtes déja connecté(e).</p>
        <b-button class="mx-3 btn-valid" href="/">Retour à l'acceuil</b-button>
        <b-button class="btn-valid" href="profil">Profil</b-button>
    </div>
</b-container> 
</template>

<script>
import Connexion from "@/components/Connexion";
import Inscription from "@/components/Inscription";
import firebase from "firebase";
export default {
    components:{
        Connexion,
        Inscription
    },
    data() {
        return{
            inscrit: true,
            isConnected: false
        }
    },
    created(){
        this.user = firebase.auth().currentUser;
        if (this.user != null){
            this.isConnected = true;
        }
    },
    methods: {
        changeDisplay(){
            console.log(this.inscrit);
            this.inscrit = !this.inscrit
        }
    }
}
</script>