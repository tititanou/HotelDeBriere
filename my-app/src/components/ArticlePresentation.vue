<template>
    <div class="col justify-content-center my-3">
      <b-card class="container-fluid">
        <img :src="article.picture" class="col-12">
        <h1>{{article.title}}</h1>
        <b-card-text>
            {{article.abstract}}
        </b-card-text>
        <router-link class="btn btn-primary" :to="{ name: 'completeArticle', params: { id: article.id, list: articlesList }}">Lire la suite</router-link>
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
      imageUrl: ""
    }
    },
  methods:{ send: function(){
    this.showContact = true
  }
  },
  
 };

</script>

<style scoped>

</style>