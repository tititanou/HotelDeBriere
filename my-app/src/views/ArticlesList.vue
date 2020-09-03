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
    };
  },
  created() {
      this.articlesList = this.display();
  },
  methods: {
    display() {

      var list = [];
      let ref = firebase.database().ref("articles");
      ref.orderByChild("releaseDate").once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          const article = {
            id: childKey,
            title: childData.title,
            abstract: childData.abstract,
            releaseDate: childData.releaseDate,
            picture: childData.picture,
          };

          list.push(article);
        });
      });
      
      return list;
    },
  },
};
</script>