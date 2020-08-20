<template>
     <b-card title="Liste des administrateurs" style="max-width: 45rem; min-width: 45rem; float:none;" class="mb-4 center-block" v-if="isConnected && isAdmin">
        <b-list-group>
            <b-list-item v-for="admin in admins" :key="admin.id">
                {{admin.firstname}} {{admin.name}}  <b-form-checkbox label="Administrateur" v-model="admin.admin" name="check-button" switch></b-form-checkbox>
            </b-list-item>
        </b-list-group>
    </b-card>
     <b-card title="Liste des administrateurs" class="mb-4 " v-else-if="isConnected && !isAdmin">
            <p>Accès refusé! Vous devez être administrateur pour accéder au contenu de cette page.</p>
            <b-button variant="primary" href="/">Retour à l'acceuil</b-button>
        </b-card>
        <b-card title="Liste des administrateurs" class="mb-4 " v-else>
            <p>Accès refusé! Vous devez vous connecter.</p>
            <b-button variant="primary" href="/">Retour à l'acceuil</b-button>
            <b-button variant="primary" href="inscriptionConnexion">Se connecter</b-button>
        </b-card>
</template>
<script>
import firebase from "firebase";
export default {
    data(){
        return{
            admins:[],
            isConnected: false,
            isAdmin: false,
            currentUser:''
        }
    },
    created(){
        this.currentUser = firebase.auth().currentUser;
        if (this.currentUser != null){
            this.isConnected = true;     
        }
        this.listAllUsers();
    },
    mounted(){
        let viewUser = this;
        viewUser.user = firebase.auth().currentUser;
        const usersRef = firebase.database().ref("users");
        usersRef.on("value", snapshot => {
            let data = snapshot.val();
            let users = [];
            Object.keys(data).forEach(key =>{
                if (key == viewUser.currentUser.uid){
                    users.push({
                        firstname: data[key].firstname,
                        name: data[key].name,
                        admin: data[key].admin
                    });
                }
            });
            if(users.length > 0) {
                viewUser.currentUser.firstname = users[0].firstname;
                viewUser.currentUser.name = users[0].name;
                viewUser.currentUser.admin = users[0].admin;
                viewUser.isAdmin = viewUser.currentUser.admin;
            }
        });
    },
    methods:{
        listAllUsers(){
            let viewUser = this;
            const usersRef = firebase.database().ref("users");
            usersRef.on("value", snapshot => {
                let data = snapshot.val();
                let users = [];
                Object.keys(data).forEach(key =>{
                    users.push({
                        firstname: data[key].firstname,
                        name: data[key].name,
                        admin: data[key].admin
                    });
                });
                viewUser.admins = users;
            });
        }
    }

}
</script>
