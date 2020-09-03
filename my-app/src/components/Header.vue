<template>
  <header>
    <div>
      <b-navbar class="shadow pt-5 mb-5" type="dark" toggleable="xl">
        <b-navbar-brand href="/">HOTEL DE BRIERE</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav v-html="this.displayMenu()">
            <!--<b-navbar-nav>
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
            <b-nav-item href="admin">Administration</b-nav-item>-->
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
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
import firebase from "firebase";
export default {
  data() {
    return {
      isConnected: false,
      user: "",
      menu: [],
    };
  },
  created() {
    this.user = firebase.auth().currentUser;
    if (this.user != null) {
      this.isConnected = true;
    }
    this.menu = this.displayTabs();
    console.log(this.menu);
    this.displayMenu();
  },
  methods: {
    /*
    
    stop le CZ
    

    
    */
    displayMenu() {
      let menuContent = "";
      for (let i = 0; i < this.menu.length; i++) {
        if (this.menu[i].subTab) {
          console.log(this.menu[i].subTab);
          menuContent =
            menuContent +
            "<li class='nav-item b-nav-dropdown dropdown' style=':hover { display: block; }; '><a role='button' aria-haspopup='true' aria-expanded='false' href='#' target='_self' class='nav-link dropdown-toggle'><span>" +
            this.menu[i].tab +
            "</span></a><ul tabindex='-1' class='dropdown-menu dropdown-menu-right'>";

          for (const subTabitem in this.menu[i].subTab) { 
            console.log("voila : " + `${subTabitem}`);
            menuContent =
              menuContent +
              "<li role='presentation'><a role='menuitem' href='" +
              `${subTabitem}` +
              "' target='_self' class='dropdown-item'>" +
              `${subTabitem}` +
              " </a></li>";
          }
         
          menuContent = menuContent + "</ul></li>";
        } else {
          menuContent =
            menuContent +
            "<li class='nav-item'><a href='" +
            this.menu[i].tab +
            "' target='_self' class='nav-link'>" +
            this.menu[i].tab +
            "</a></li>";
        }
      }
      return menuContent;
    },
    displayTabs() {
      let tabs = [];
      let ref = firebase.database().ref("tabs");
      ref.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          tabs.push(childSnapshot.val());
        });
      });
      return tabs;
    },
    signOutUser() {
      firebase
        .auth()
        .signOut()
        .then(function () {
          alert("Vous êtes déconnecté. A bientôt");
        })
        .catch(function (error) {
          console.log(error.message);
          alert("Une erreur s'est produite. Vous n'êtes pas déconnecté.");
        });
    },
  },
};
</script>

<style scoped>
@import "../assets/custom.scss";
</style>


