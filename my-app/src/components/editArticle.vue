<template>
  <div class="col justify-content-center my-3">
    <b-card class="row">
      <h1 class="col">{{article.title}}</h1>
      <p class="col">Article du :{{article.releaseDate}}</p>
      <div class="row">
        <router-link
          class="btn btn-primary mx-3"
          :to="{ name: 'modifyingArticle', params: { id: article.id, list: articlesList }}"
        >Modifier</router-link>
        <b-input
          v-model="checkName"
          class="ml-3 col-5"
          placeholder="Entrer le nom de l'article et cliquer sur supprimer"
        ></b-input>
        <b-button @click="deleteArticle(article)" type="submit" variant="danger">Supprimer</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import db from "firebase";

export default {
  props: {
    article: Object,
    articlesList: Array,
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

    deleteArticle(article) {
      console.log(this.checkName);
      console.log(article)
      if (article.title == this.checkName) {
        let articleRef = db.database().ref('articles/' + article.id);
        articleRef.remove();
      } else {
        alert("Entrez correctement le nom de l'article");
      }
    },
  },
};
</script>

<style scoped>
</style> 