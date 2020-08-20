<template>
    <b-card title="Mon profil" style="max-width: 45rem; min-width: 45rem; float:none;" class="mb-4 center-block">
        <b-form @submit.prevent="createUser">
            <b-form-group label="Prénom:" label-for="inputFirstname">
                <b-form-input id="inputFirstName" v-model="form.firstname" type="text" required placeholder="Prénom">{{userslct.firstname}}</b-form-input>
            </b-form-group>
            <b-form-group label="Nom" label-for="inputName">
                <b-form-input id="inputName" v-model="form.name" type="text" required placeholder="Nom">{{userslct.name}}</b-form-input>
            </b-form-group>
            <b-form-group label="Email" label-for="inputEmail">
                <b-form-input id="inputEmail" v-model="form.email" type="email" disabled>{{user.email}}</b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Valider</b-button>
        </b-form>
        <b-button v-if="isAdmin" variant="danger" href="admin">Espace Administrateur</b-button>
    </b-card>
</template>

<script>
//mport axios from "axios"
import firebase from "firebase"
import "firebase/auth"
export default {
    data(){
        return{
            connected: false,
            user: {},
            userslct: {
                firstname:'',
                name: '',
                admin: false
            },
            isAdmin: false,
            form:{
                firstname:'',
                name:'',
                email: ''
            },
        }
    },
    created(){
        this.connected = this.$store.getters.user.loggedIn;
        console.log(firebase.auth().currentUser.email)
        this.user = firebase.auth().currentUser;
        this.form.email = this.user.email;
    },
    methods:{
        createUser(){
            let userfb = firebase.auth().currentUser;
            firebase.database().ref('users/' + userfb.uid).set({
                firstname: this.form.firstname,
                name: this.form.name,
                email: userfb.email,
                admin: this.userslct.admin
            }).then(() => {
                alert("Votre profil a été mis à jour.")
                this.$router.replace({ name: "home" })

            });
        },
    },
    mounted() {
        let viewUser = this;
        const usersRef = firebase.database().ref("users");
        usersRef.on("value", snapshot => {
            let data = snapshot.val();
            let users = [];
            Object.keys(data).forEach(key =>{
                if (key == viewUser.user.uid){
                    users.push({
                        firstname: data[key].firstname,
                        name: data[key].name,
                        admin: data[key].admin
                    });
                }
            });
            if(users.length > 0) {
                viewUser.userslct.firstname = users[0].firstname;
                viewUser.userslct.name = users[0].name;
                viewUser.userslct.admin = users[0].admin;
                viewUser.form.firstname = viewUser.userslct.firstname;
                viewUser.form.name = viewUser.userslct.name;
                viewUser.isAdmin = viewUser.userslct.admin;
            }
        });
    },
}
</script>