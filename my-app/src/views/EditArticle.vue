<template>
  <b-container>
    <div class="row my-5">
      <h1>Articles:</h1>
    </div>
    <div>
      <Edit
        v-for="articleI in articlesList"
        :article="articleI"
        :key="articleI.id"
        :articlesList="articlesList"
      />
    </div>
  </b-container>
</template>


<script>
import firebase from "firebase";
import Edit from "@/components/editArticle.vue";

export default {
  components: {
    Edit,
  },
  data() {
    return {
      articlesList: [],
    };
  },
  created() {
    this.articlesList = this.display();
    console.log("le pb est ici!");
    console.log("1: " + this.articlesList.length);
  },
  mounted: function () {
    //this.articlesList = this.$store.getters.articles;
  },
  methods: {
    display() {
      var list = [];
      let ref = firebase.database().ref("articles");
      ref.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          const article = {
            id: childKey,
            title: childData.title,
            releaseDate: childData.releaseDate,
          };
          console.log(article);
          list.push(article);
        });
      });
      console.log(list.length);
      return list;
    },
  },
};
</script>

<style scoped>
</style> 