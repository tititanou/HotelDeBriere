<template>
  <div class="col justify-content-center my-3">
    <b-card class="row">
      <h1 class="col">{{event.title}}</h1>
      <p class="col">Evénement du :{{event.releaseDate}}</p>
      <div class="row">
        <router-link
          class="btn btn-valid mx-3"
          :to="{ name: 'modifyingEvent', params: { id: event.id, list: eventsList }}"
        >Modifier</router-link>
        <b-input
          v-model="checkName"
          class="ml-3 col-5"
          placeholder="Entrer le nom de l'événement et cliquer sur supprimer"
        ></b-input>
        <b-button @click="deleteArticle(event)" type="submit" variant="danger">Supprimer</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import db from "firebase";

export default {
  props: {
    event: Object,
    eventsList: Array,
  },
  data() {
    return {
      showContact: false,
      imageUrl: "",
      checkName: "",
    };
  },
  methods: {
    send: function () {
      this.showContact = true;
    },

    deleteArticle(event) {
      console.log(this.checkName);
      console.log(event)
      if (event.title == this.checkName) {
        let eventRef = db.database().ref('events/' + event.id);
        eventRef.remove().then(window.location.reload());
      } else {
        alert("Entrez correctement le nom de l'événement");
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/custom.scss";
</style>