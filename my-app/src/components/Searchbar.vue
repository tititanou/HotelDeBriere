<template>
  <div class="row">
    <multiselect
      class="col-4"
      v-model="tags"
      :multiple="true"
      :options="propTags"
      :max=3
    ></multiselect>
    <b-input
      class="col-3"
      type="text"
      v-model="search"
      placeholder="Rechercher un article"
    />
    <b-button class="col-1 mx-3" variant="primary" @click="searchArticleByText"
      >Rechercher</b-button
    >
    <b-button class="col-1" variant="info" @click="sortArrays(articlesList)"
      >Date</b-button
    >
    <b-button class="col-1 mx-3" variant="primary" @click="searchArticleByText"
      >Titre</b-button
    >
    <b-button class="col-1" variant="info" @click="searchArticleByText"
      >Auteur</b-button
    >
  </div>
</template>

<script>
import firebase from "firebase";
import Multiselect from "vue-multiselect";
export default {
  components: { Multiselect },
  data() {
    return {
      search: "",
      articleTags: [],
      selectedTags: [],
      propTags: [],
      tags: [],
    };
  },
  created() {
    this.displayPropTags(this.propTags);
  },
  methods: {
    displayPropTags(list) {
      let ref = firebase.database().ref("tags");
      ref.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          console.log(childKey);
          list.push(childKey);
        });
      });
      console.log(list.length);
    },
    searchArticleByText() {
      console.log(this.search);
      console.log(this.tags);
      //let keyW = this.search;
      //let
      var ref = firebase.database().ref("/annonces");
      ref.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          const advert = {
            id: childKey,
            propriétaire: childData.propriétaire,
            categorie: childData.categorie,
            marque: childData.marque,
            titre: childData.titre,
            prix: childData.prix,
            description: childData.description,
            ville: childData.ville,
            dateDePublication: childData.date,
            disponibility: true,
            imageUrl: childData.imageUrl,
          };
          console.log(advert);
          /*if (categorie != null) {
                        if (advert.categorie == categorie) {
                            commit('SET_ANNONCES', advert)
                        }
                    }*/
        });
      });
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style></style>
