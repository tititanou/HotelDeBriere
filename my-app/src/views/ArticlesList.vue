<template>
  <div>

      <Article
       v-for="articleI in articlesList"
      :article="articleI" 
      :key="articleI.id"
      />
    
  </div>
</template>


<script>
import Article from "@/components/ArticlePresentation.vue";
import firebase from "firebase";

export default {
 
  components: {
    Article
  },
     data(){
        return {
            articlesList:[],

        }
     },
     created(){
       this.articlesList = this.display();
       console.log("le pb est ici!")
       console.log("1: " + this.articlesList.length)
     },
     mounted: function(){
       //this.articlesList = this.$store.getters.articles;
     },
     methods:{
       display(){ 
         var list = [];        
         let ref = firebase.database().ref('articles');
            ref.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    const article = {
                        id: childKey,
                        title: childData.title,
                        subtitle: childData.subtitle,
                        abstract: childData.abstract,
                        content: childData.content,
                        releaseDate: childData.releaseDate,
                        autor: childData.autor,
                        category: childData.category,
                        picture: childData.picture
                    }
                    console.log(article);
                    list.push(article);
                });
            });
            console.log(list.length);
            return list;
       }
     }
};
</script>