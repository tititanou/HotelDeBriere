<template>
  <div class="col justify-content-center my-3">
      <b-card class="container-fluid">
        <img :src="event.picture" class="col-12">
        <h1>{{event.title}}</h1>
        <b-card-text>
          <h2>Evénement prévu le : {{date}}</h2>
            {{event.abstract}}
        </b-card-text>
        <router-link class="btn btn-primary" :to="{ name: 'completeEvent', params: { id: event.id, list: eventList }}">Lire la suite</router-link>
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
    this.date = this.formatCompat(this.event.releaseDate);
  },
  methods: {
    formatCompat(date) {
      var ms = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return (
        date.getDate() + " " + ms[date.getMonth()] + " " + date.getFullYear()
      );
    },
    send: function () {
      this.showContact = true;
    },
  },
};
</script>

<style scoped>
</style>