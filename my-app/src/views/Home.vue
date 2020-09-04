<template>
  <div class="mt-5">
    <b-container>
      <b-row>
        <b-col lg="4" md="12" sm="12" class="mb-5">
          <homePresentation />
        </b-col>
        <b-col lg="8" md="12" sm="12">
          <h2>Evénements à venir :</h2>
          <b-row cols="1" cols-lg="2" cols-md="1" cols-sm="1" class="mb-5 ml-auto">
            <Event
              class="my-3"
              v-for="evnt in eventsList"
              :event="evnt"
              :key="evnt.id"
              :eventsList="eventsList"
            />
          </b-row>
        </b-col>

        <h2>Voici nos derniers articles !</h2>
        <b-row cols="1" cols-lg="2" cols-md="1" cols-sm="1" class="my-5">
          <Article
            v-for="articleI in articlesList"
            :article="articleI"
            :key="articleI.id"
            :articlesList="articlesList"
          />
        </b-row>
      </b-row>
    </b-container>
  </div>
  
</template>

<script>
import homePresentation from "@/components/homePresentation.vue";
import Event from "@/components/EventPresentation.vue";
import Article from "@/components/ArticlePresentation.vue";
import firebase from "firebase";
import moment from "moment";
export default {
  components: {
    homePresentation,
    Article,
    Event,
  },
  data() {
    return {
      articlesList: [],
      eventsList: [],
    };
  },
  created() {
    this.articlesList = this.displayArticles();
    this.eventsList = this.displayEvents();
  },
  methods: {
    displayArticles() {
      var list = [];
      let ref = firebase.database().ref("articles");
      ref
        .orderByChild("releaseDate")
        .limitToLast(4)
        .once("value", function (snapshot) {
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
    displayEvents() {
      var list = [];
      let ref = firebase.database().ref("events");
      ref.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          const event = {
            id: childKey,
            title: childData.title,
            abstract: childData.abstract,
            releaseDate: childData.releaseDate,
            picture: childData.picture,
          };
          if (event.releaseDate >= moment().format("YYYY-MM-DD")) {
            list.push(event);
          }
        });
      });
      return list;
    },
  },
};
</script>

<style scoped>
</style>