<template>
     <b-card title="Liste des administrateurs" style="max-width: 45rem; min-width: 45rem; float:none;" class="mb-4 center-block" v-if="isConnected && isAdmin">
        <b-list-group>
            <b-list-item v-for="admin in admins" :key="admin.id">
                <b-form-checkbox label="Administrateur" v-model="admin.admin" @change="updateAdmin(admin)" name="check-button" switch></b-form-checkbox>{{admin.firstname}} {{admin.name}}
            </b-list-item>
        </b-list-group>
    </b-card>
     <b-card title="Liste des administrateurs" class="mb-4 " v-else-if="isConnected && !isAdmin">
            <p>Accès refusé! Vous devez être administrateur pour accéder au contenu de cette page.</p>
            <b-button class="btn-valid" href="/">Retour à l'acceuil</b-button>
        </b-card>
        <b-card title="Liste des administrateurs" class="mb-4 " v-else>
            <p>Accès refusé! Vous devez vous connecter.</p>
            <b-button class="btn-valid" href="/">Retour à l'acceuil</b-button>
            <b-button class="btn-valid" href="inscriptionConnexion">Se connecter</b-button>
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
            currentUser:'',
            adminState: false,
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
                        id: key,
                        firstname: data[key].firstname,
                        name: data[key].name,
                        admin: data[key].admin,
                        email: data[key].email
                    });
                });
                viewUser.admins = users;
            });
        },
        updateAdmin(us){
            console.log(us.id)
            firebase.database().ref('users/' + us.id).set({
                firstname: us.firstname,
                name: us.name,
                email: us.email,
                admin: !us.admin
            }).then(() => {
                if(us.admin == false){
                    alert("L'utilisateur " + us.firstname + " " + us.name + " a maintenant le statut Administrateur.")
                }
                else{
                    alert("L'utilisateur " + us.firstname + " " + us.name + " ne fait plus partie des administrateurs.")
                }
                //alert("Le statut de l'utilisateur " + us.firstname + " " + us.name + "a bien été modifié.")
            });
        }
    }

}
</script>

<style scoped>
@import "../assets/custom.scss";
</style>