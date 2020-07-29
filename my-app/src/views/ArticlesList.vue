<template>
  <div>

      <Article
       v-for="article in Listarticles"
      :key="article.id"
      :article="article"
      />
    
  </div>
</template>


<script>
import Article from "@/components/ArticlePresentation.vue";



export default {
 
  components: {
    Article
  },
     data(){
        return {
            Listarticles:[],

        }
     },
     created(){
    this.Listarticles = this.$store.getters.articles
  
     },
     mounted:function(){
        this.display()
        console.log("list" + this.Listarticles)
      },
     methods:{
       display(){         
         this.$store.dispatch('displayArticles')
       }
     }
};
</script>