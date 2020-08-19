<template>
<b-container>
<div v-if=inscrit>
    <Connexion />
    <p @click="changeDisplay()">Pas encore inscrit?</p>
</div> 
<div v-else>
    <Inscription />
    <div @click="changeDisplay()">Déjà inscrit?</div>
</div>
</b-container> 
</template>

<script>
import Connexion from "@/components/Connexion";
import Inscription from "@/components/Inscription";
export default {
    components:{
        Connexion,
        Inscription
    },
    data() {
        return{
            inscrit: true
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