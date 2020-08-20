<template>
  <b-container>
    <div class="row my-5">
      <h1>On en parle !</h1>
    </div>
    <div class="row" style="background-color: black;">
    <input type="text" v-model="search" placeholder="Rechercher un article">
    <b-button variant="primary" @click="searchArticleByText">Go</b-button>
    </div>
    <b-row cols="1" cols-lg="2" cols-md="1" cols-sm="1">
      <Article
       v-for="articleI in articlesList"
      :article="articleI" 
      :key="articleI.id"
      :articlesList="articlesList"
      />
    </b-row>
  </b-container>
</template>


<script>
import Article from "@/components/ArticlePresentation.vue";
import firebase from "firebase";

export default {
 
  components: {
    Article
  },
     data(){
        return {
            articlesList:[],
          search: "",
        }
     },
     created(){
       this.articlesList = this.display();
       console.log("le pb est ici!")
       console.log("1: " + this.articlesList.length)
     },
     mounted: function(){
       //this.articlesList = this.$store.getters.articles;
     },
     methods:{
       searchArticleByText(){
         console.log(this.search)
       },
       display(){ 
         var list = [];        
         let ref = firebase.database().ref('articles');
            ref.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    const article = {
                        id: childKey,
                        title: childData.title,
                        abstract: childData.abstract,
                        releaseDate: childData.releaseDate,
                        picture: childData.picture
                    }
                    console.log(article);
                    list.push(article);
                });
            });
            console.log(list.length);
            return list;
       }
     }
};
</script>