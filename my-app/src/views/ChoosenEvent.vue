<template>
  <div>
    <b-container>
      <div
        v-if="eventSelected[0].media && eventSelected[0].is3DReal == false"
        class="mb-4 embed-responsive embed-responsive-16by9"
      >
        <iframe class="col-12 embed-responsive-item" :src="eventSelected[0].video" frameborder="0"></iframe>
      </div>
      <div v-if="eventSelected[0].media && eventSelected[0].is3DReal">
        <div class="sketchfab-embed-wrapper mb-4 embed-responsive embed-responsive-16by9">
          <iframe
            class="col-12 embed-responsive-item"
            title="A 3D model"
            :src="eventSelected[0].media"
            frameborder="0"
            allow="autoplay; fullscreen; vr"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
          ></iframe>
        </div>
      </div>
      <div v-else>
        <img :src="eventSelected[0].picture" class="col-12" />
      </div>
      <div>
        <h1>{{eventSelected[0].title}}</h1>
        <h3>{{this.displayDate(eventSelected[0].releaseDate)}}</h3>
        <div v-html="eventSelected[0].content"></div>
      </div>
    </b-container>
  </div>
</template>




<script>
import firebase from "firebase";

export default {
  props: ["id"],

  data() {
    return {
      eventId: "",
      eventSelected: [],
    };
  },
  created() {
    this.eventId = this.getIDfromURL();
    console.log(this);
    console.log(this.eventId);
    this.display(this.eventId, this.eventSelected);
  },
  mounted: function () {},
  methods: {
    displayDate(date) {
      let month = ""
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
        if( i == date.split("-")[1]) {
          month = months[i-1]
        }
      }
      return "" + date.split("-")[2] + " " + month + " " + date.split("-")[0] + ""
    },
    display: function (id, list) {
      let ref = firebase.database().ref("events");
      ref.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          console.log(childData);
          const eventSlct = {
            id: childKey,
            title: childData.title,
            abstract: childData.abstract,
            content: childData.content,
            releaseDate: childData.releaseDate,
            picture: childData.picture,
            media: childData.media,
            is3DReal: childData.is3DReal,
          };
          if (childKey == id) {
            console.log(childKey);
            list.push(eventSlct);
            console.log("1 " + list.length);
          }
        });
      });
    },
    getIDfromURL: function () {
      return window.location.pathname.split("event")[1];
    },
  },
};
</script>