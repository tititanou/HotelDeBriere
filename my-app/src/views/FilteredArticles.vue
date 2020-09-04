<template>
  <b-container>
    <div class="row my-5">
      <h1>On en parle !</h1>
    </div>
    <!--<Searchbar />-->
    <b-row cols="1" cols-lg="2" cols-md="1" cols-sm="1">
      <Article
        v-for="art in articlesList"
        :article="art"
        :key="art.id"
        :articlesList="articlesList"
      />
    </b-row>
  </b-container>
</template>


<script>
import Article from "@/components/ArticlePresentation.vue";
//import Searchbar from "@/components/Searchbar.vue";
import firebase from "firebase";

export default {
  components: {
    Article,
    //Searchbar,
  },
  data() {
    return {
      articlesList: [],
      search: "",
      urlPath: "",
    };
  },
  created() {
    this.urlPath = this.getIDfromURL();
    this.articlesList = this.display(decodeURI(this.urlPath));
  },
  methods: {
    getIDfromURL: function () {
      return window.location.pathname.split("KTA")[1];
    },
    display(url) {
      var list = [];
      console.log(url);
      let ref = firebase.database().ref("articles");
      ref.orderByChild("releaseDate").once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          if (childData.subTab) {
            if (url == childData.subTab) {
              const article = {
                id: childKey,
                title: childData.title,
                abstract: childData.abstract,
                releaseDate: childData.releaseDate,
                picture: childData.picture,
              };
              list.push(article);
            }
          } else {
            if (url == childData.tab) {
              const article = {
                id: childKey,
                title: childData.title,
                abstract: childData.abstract,
                releaseDate: childData.releaseDate,
                picture: childData.picture,
              };
              list.push(article);
            } 
          }
        });
      });
      /*if(list.length == 0){
        window.location.pathname = '404'
      }*/
      return list;
    },
  },
};
</script>

<style>
</style>