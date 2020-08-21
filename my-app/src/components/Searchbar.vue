<template>
  <div class="row">
    <b-select id="Tags" v-model="selectedTag" name="Tags" class="col">
      <option value disabled>Catégorie</option>
      <option v-for="tag in articleTags" v-bind:key="tag">{{ tag }}</option>
    </b-select>
    <b-input
      class="col"
      type="text"
      v-model="search"
      placeholder="Rechercher un article"
    />
    <b-button class="col" variant="primary" @click="searchArticleByText"
      >Rechercher</b-button
    >
    <b-button class="col" variant="info" @click="sortArrays(articlesList)"
      >Trier</b-button
    >
    <b-button class="col" variant="primary" @click="searchArticleByText"
      >Go</b-button
    >
    <b-button class="col" variant="info" @click="searchArticleByText"
      >Go</b-button
    >
  </div>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            search: "",
            articleTags: [],
            selectedTag: "",
        };
    },
    created() {
        this.displayPropTags(this.articleTags);
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
            console.log(this.selectedTag);
            //let keyW = this.search;
            //let
            var ref = firebase.database().ref('/annonces');
            ref.once('value', function(snapshot) {
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
                        imageUrl: childData.imageUrl
                    }
                    console.log(advert);
                    /*if (categorie != null) {
                        if (advert.categorie == categorie) {
                            commit('SET_ANNONCES', advert)
                        }
                    }*/
                });
            });
        },
    }
};
</script>

<style></style>
