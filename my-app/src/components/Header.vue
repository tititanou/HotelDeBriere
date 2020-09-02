<template>
<header>
  <div>
  <b-navbar class="shadow pt-5 mb-5" toggleable="xl" type="dark" variant="info">
    <b-navbar-brand href="/">HOTEL DE BRIERE</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown text="L'association" right>
          <b-dropdown-item href="#">Présentation</b-dropdown-item>
          <b-dropdown-item href="#">Son histoire</b-dropdown-item>
          <b-dropdown-item href="#">Nous joindre</b-dropdown-item>
          <b-dropdown-item href="#">Partenaires</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Le projet" right>
          <b-dropdown-item href="#">L'emergence</b-dropdown-item>
          <b-dropdown-item href="#">La convention</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item href="#">La phase d'amorçage</b-nav-item>
        <b-nav-item href="#">Le chantier</b-nav-item>
        <b-nav-item href="events">Evenements</b-nav-item>
        <b-nav-item href="articles">On en parle</b-nav-item>
        <b-nav-item href="#">Ressources</b-nav-item>
        <b-nav-item href="admin">Administration</b-nav-item>
        

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>


        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>Espace Perso</em>
          </template>
          <b-dropdown-item v-if="isConnected" href="profil">Profil</b-dropdown-item>
          <b-dropdown-item v-if="!isConnected" href="inscriptionConnexion">Se connecter</b-dropdown-item>
          <b-dropdown-item v-on:click="signOutUser" href="/">Déconnexion</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</header>
</template>


<script>
import firebase from "firebase"
export default{
  data(){
    return{
      isConnected: false,
      user: '',
      menu: []
    }
  },
  created(){
    this.user = firebase.auth().currentUser;
    console.log(this.user)
    if(this.user != null){
      return this.isConnected = true;
    }
    console.log("1/ " + this.menu)
    this.menu = this.displayMenu();
    console.log("coucou " + this.menu)
  },
  methods:{
    displayMenu(){
      let list = [];
      let ref = firebase.database().ref('tabs');
      ref.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          //var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          const onglet = {
            tab: childData.tab,
            subTab: childData.subTab
          }
          console.log("onglet = " + onglet);
          list.push(onglet);
          //onglets.push(childKey)
        });
      });
      return list;
    },
    signOutUser(){
      firebase.auth().signOut().then(function() {
        alert("Vous êtes déconnecté. A bientôt");
      }).catch(function(error) {
        console.log(error.message)
        alert("Une erreur s'est produite. Vous n'êtes pas déconnecté.");
    });
    }
  }
  /*mounted(){
    let self = this;
    //let onglets = []
    let ref = firebase.database().ref('tabs');
    ref.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        const onglet = {
          tab: childData.tab,
          subTab: childData.subTab
        }
        console.log(childKey);
        self.menu.push(onglet);
        //onglets.push(childKey)
      });
    });
    let list = [];
    let db = firebase.database()
    console.log("onglets: " + onglets.length)
    for(let i = 0; i < onglets.length; i++){
      let tab = onglets[i];
      let tempStr = "tabs/" + tab + "/subTab";
      console.log("hello " + tempStr);
      db.ref('tabs/' + tab + '/subTab').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childData = childSnapshot.key;
          if (childData != ''){
            list.push(childData)
          }
        })
        console.log("coucou" + list);
      })
    }
    console.log("couc" + self.menu);
  },
  beforeUpdate(){
    this.user = firebase.auth().currentUser;
    console.log(this.user)
    if(this.user != null){
      return this.isConnected = true;
    }
  },*/
 
}
</script>

<style scoped>