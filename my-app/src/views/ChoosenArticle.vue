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
          article:"",
          articlesList: []
        }
     },
     created(){
      console.log("Y a t'il un pb ici?")
      this.articlesList = this.$store.getters.articles;
      console.log(this.articlesList)
      this.article = this.getArticle();
     },
     mounted:function(){
       console.log("ou là?")
        this.recupList();
        //console.log("pk??" + this.id)
        this.getArticle();
      },
     methods:{
       recupList(){         
         this.$store.dispatch('displayArticles')
       },
       getArticle(){
         console.log(this.articlesList.length)
           for (let i = 0; i < this.articlesList.length; i++){
               if(this.id == this.articlesList[i].id) {
                   this.article = this.articlesList[i];
               }
           }
          //console.log("3: " + this.list.length)

       }
     }
};
</script>