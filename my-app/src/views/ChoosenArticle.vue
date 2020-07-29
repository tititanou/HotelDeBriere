<template>
  <div>

      <Article :article="article" />
    
  </div>
</template>


<script>
import Article from "@/components/CompleteArticle.vue";



export default {
 props:['id'],
  components: {
    Article
  },
     data(){
        return {
            articlesList:[],
            article:"",
        }
     },
     created(){
    this.articlesList = this.$store.getters.articles;
    this.article = this.getArticle();
     },
     mounted:function(){
        this.recupList();
        this.getArticle();
      },
     methods:{
       recupList(){         
         this.$store.dispatch('displayArticles')
       },
       getArticle(){
           for (let i = 0; i < this.articlesList.length; i++){
               if(this.id == this.articlesList[i].id) {
                   this.article = this.articlesList[i];
               }
           }
       }
     }
};
</script>