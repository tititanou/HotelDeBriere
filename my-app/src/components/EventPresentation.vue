<template>
  <div class="col justify-content-center my-3">
      <b-card class="shadow container-fluid">
        <img :src="event.picture" class="col-12">
        <h1>{{event.title}}</h1>
        <b-card-text>
          <h3>Evénement prévu le : {{this.displayDate(event.releaseDate)}}</h3>
            {{event.abstract}}
        </b-card-text>
        <router-link class="btn btn-secondary btn-valid" :to="{ name: 'completeEvent', params: { id: event.id, list: eventList }}">Lire la suite</router-link>
      </b-card>
    </div>
</template>

<script>
export default {
  props: {
    event: Object,
    eventList: Array,
  },
  data() {
    return {
      showContact: false,
      imageUrl: "",
      date:"",
    };
  },
  created() {
    
  },
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
    send: function () {
      this.showContact = true;
    },
  },
};
</script>
<style scoped>
@import "../assets/custom.scss";
</style>