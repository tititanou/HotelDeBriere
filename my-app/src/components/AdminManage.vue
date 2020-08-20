<template>
    <b-container>
        <b-card title="Portail administrateur" class="mb-4 " v-if="isConnected && isAdmin">
            <p>Bienvenue {{currentU.firstname}}!</p>
            <b-card-group deck>
                <b-col>
                    <b-row class="my-1">
                        <b-card title="Articles">
                            <b-col class="my-1">
                                <b-button variant="outline-secondary" block href="newArticle" size="lg">Ajouter un article</b-button>    
                            </b-col>
                            <b-col class="my-1">
                                <b-button variant="outline-secondary" block href="#" size="lg">Modifier ou supprimer un article</b-button>    
                            </b-col>
                        </b-card>
                    </b-row>
                    
                    <b-row class="my-1">
                        <b-card title="Evenements">
                            <b-col class="my-1">
                                <b-button variant="outline-secondary" block href="#" size="lg">Ajouter un événement</b-button>    
                            </b-col>
                            <b-col class="my-1">
                                <b-button variant="outline-secondary" block href="#" size="lg">Modifier ou supprimer un événement</b-button>    
                            </b-col>
                        </b-card>
                        
                    </b-row>
                    
                    <b-row class="my-1">
                        <b-card title="Publicité">
                            <b-col class="my-1">
                                <b-button variant="outline-secondary" block href="#" size="lg">Ajouter une publicité</b-button>    
                            </b-col>
                            <b-col class="my-1">
                                <b-button variant="outline-secondary" block href="#" size="lg">Modifier ou supprimer une publicité</b-button>    
                            </b-col>
                        </b-card>
                    </b-row>
                    
                    <b-row class="my-1">
                        <b-card title="Gestion Utilisateurs">
                            <b-button variant="outline-secondary" block href="gestionAdmins" size="lg">Gerer les administrateurs</b-button>
                        </b-card>
                    </b-row>
                </b-col>
            </b-card-group>
        </b-card>
        <b-card title="Portail administrateur" class="mb-4 " v-else-if="isConnected && !isAdmin">
            <p>Accès refusé! Vous devez être administrateur pour accéder au contenu de cette page.</p>
            <b-button variant="primary" href="/">Retour à l'acceuil</b-button>
        </b-card>
        <b-card title="Portail administrateur" class="mb-4 " v-else>
            <p>Accès refusé! Vous devez vous connecter.</p>
            <b-button variant="primary" href="/">Retour à l'acceuil</b-button>
            <b-button variant="primary" href="inscriptionConnexion">Se connecter</b-button>
        </b-card>
    </b-container>
</template>

<script>
import firebase from 'firebase'
export default {
    data(){
        return {
            isConnected: false,
            isAdmin: false,
            user: '',
            currentU:{
                firstname:'',
                name:'',
                admin:false
            }
        }
    },
    created(){
        this.user = firebase.auth().currentUser;
        if (this.user != null){
            this.isConnected = true;
        }
    },
    mounted(){
        let viewUser = this;
        viewUser.user = firebase.auth().currentUser;
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
                viewUser.currentU.firstname = users[0].firstname;
                viewUser.currentU.name = users[0].name;
                viewUser.currentU.admin = users[0].admin;
                viewUser.isAdmin = viewUser.currentU.admin;
            }
        });
    }
}
</script>