<template>
  <div class="col justify-content-center my-3">
    <b-card class="shadow container-fluid">
      <img :src="article.picture" class="col-12" />
      <h1>{{article.title}}</h1>
      <p>Article du {{this.displayDate(article.releaseDate)}}</p>
      <b-card-text>{{article.abstract}}</b-card-text>
      <router-link
        class="btn btn-secondary btn-valid"
        :to="{ name: 'completeArticle', params: { id: article.id, list: articlesList }}"
      >Lire la suite</router-link>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    article: Object,
    articlesList: Array,
  },
  data() {
    return {
      showContact: false,
      imageUrl: "",
      date: "",
    };
  },
  created() {
    
  },
  methods: {
    send: function () {
      this.showContact = true;
    },
    displayDate(date) {
      let month = "";
      let months = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ];
      for (let i = 0; i <= months.length; i++) {
        if (i == date.split("-")[1]) {
          month = months[i - 1];
        }
      }
      return (
        "" + date.split("-")[2] + " " + month + " " + date.split("-")[0] + ""
      );
    },
  },
};
</script>

<style>
@import "../assets/custom.scss";
</style>