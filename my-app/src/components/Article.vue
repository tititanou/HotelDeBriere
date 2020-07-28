<template>
    <div class="row">
        <b-card
            tag="article"
            style="max-width: 50rem; min-width: 50rem"
            class="mb-4"
        >
            <b-card-text>
              <h1>{{article.titre}}</h1>
              <p>{{article.resume}}</p>
            </b-card-text>

            <b-button href="#" variant="primary">Lire la suite</b-button>
        </b-card>
    </div>
</template>

<script>
export default {

  props: {
    article: Object,
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