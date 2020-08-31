<template>
  <b-container>
    <div class="row my-5">
      <h1>Evénements:</h1>
    </div>
    <div v-if="isConnected && isAdmin">
      <Edit
        v-for="eventI in eventsList"
        :event="eventI"
        :key="eventI.id"
        :eventsList="eventsList"
      />
    </div>
    <b-card class="mb-4 " v-else-if="isConnected && !isAdmin">
      <p>Accès refusé! Vous devez être administrateur pour accéder au contenu de cette page.</p>
      <b-button variant="primary" href="/">Retour à l'acceuil</b-button>
    </b-card>
    <b-card class="mb-4 " v-else>
      <p>Accès refusé! Vous devez vous connecter.</p>
      <b-button variant="primary" href="/">Retour à l'acceuil</b-button>
      <b-button variant="primary" href="inscriptionConnexion">Se connecter</b-button>
    </b-card>
  </b-container>
</template>


<script>
import firebase from "firebase";
import Edit from "@/components/editEvent.vue";

export default {
  components: {
    Edit,
  },
  data() {
    return {
      eventsList: [],
      isConnected: false,
      isAdmin: false,
      user: '',
      currentU:{
        firstname:'',
        name:'',
        admin:false
      }
    };
  },
  created() {
    this.eventsList = this.display();
    console.log("le pb est ici!");
    console.log("1: " + this.eventsList.length);
    this.user = firebase.auth().currentUser;
    if (this.user != null){
      this.isConnected = true;
    }
  },
  mounted: function () {
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
  },
  methods: {
    display() {
      var list = [];
      let ref = firebase.database().ref("events");
      ref.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          const event = {
            id: childKey,
            title: childData.title,
            releaseDate: childData.releaseDate,
          };
          console.log(event);
          list.push(event);
        });
      });
      console.log(list.length);
      return list;
    },
  },
};
</script>

<style scoped>
</style> 