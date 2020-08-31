<template>
  <b-container>
    <div class="row my-5">
      <h1>Evénements à venir :</h1>
    </div>
    <b-row cols="1" cols-lg="2" cols-md="1" cols-sm="1">
      <Event v-for="eventI in eventList" :event="eventI" :key="eventI.id" :eventList="eventList" />
    </b-row>
    <div class="row my-5">
      <h1>Evénements terminés :</h1>
    </div>
    <b-row cols="1" cols-lg="2" cols-md="1" cols-sm="1">
      <Event v-for="eventI in pastEventList" :event="eventI" :key="eventI.id" :eventList="eventList" />
    </b-row>
  </b-container>
</template>


<script>
import Event from "@/components/EventPresentation.vue";
import firebase from "firebase";
import moment from "moment";

export default {
  components: {
    Event,
  },
  data() {
    return {
      eventList: [],
      pastEventList: [],
    };
  },
  created() {
    this.eventList = this.display();
    this.pastEventList = this.displayPast();
    console.log("le pb est ici!");
    console.log("1: " + this.eventList.length);
  },
  mounted: function () {
    //this.articlesList = this.$store.getters.articles;
  },
  methods: {
    display() {
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
          console.log(event);
          if (event.releaseDate >= moment().format("YYYY-MM-DD")) {
            list.push(event);
          }
        });
      });
      console.log(list.length);
      return list;
    },
    displayPast() {
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
          console.log(event);
          if (event.releaseDate < moment().format("YYYY-MM-DD")) {
            list.push(event);
          }
        });
      });
      console.log(list.length);
      return list;
    },
  },
};
</script>