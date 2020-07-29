<template>
    <div class="row">
        <b-card
                :title="article.title"
                :img-src="article.picture"
                img-alt="Image"
                img-top
                img-width="max-width: 50rem"
                img-height="max-height: 50rem"
                tag="article"
                style="max-width: 45rem; min-width: 45rem; float:none;"
                class="mb-4 center-block"
            >
                <b-card-text>
                    {{article.abstract}}
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