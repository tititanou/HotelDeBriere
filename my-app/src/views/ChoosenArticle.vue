<template>
<b-container>
    <b-card
                :img-src="articleSelected[0].picture"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-4"
                >
                <h1>{{articleSelected[0].title}}</h1>
                <h3>{{articleSelected[0].subtitle}}</h3>
                <div class="row">
                    <div class="col">{{articleSelected[0].releaseDate}}</div> 
                    <div class="col">{{articleSelected[0].autor}}</div>  
                    <div class="col">{{articleSelected[0].category}}</div>
                </div>
                
                <b-card-text v-html="articleSelected[0].content"></b-card-text>
                </b-card>
</b-container>
</template>




<script>
//import Article from "@/components/CompleteArticle.vue";
/*
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
      this.articlesList = this.$store.getters.articles;
      this.recupList();
      this.article = this.getArticle();
      console.log("created: " + this.article)
     },
     updated:function(){
        this.recupList();
        this.getArticle();
        console.log("mounted: " + this.article)
      },
      
      mounted:function(){
        this.$nextTick(function () {
          this.recupList();
          this.getArticle();
        })
      },
     methods:{
       recupList(){         
         this.$store.dispatch('displayArticles')
       },
       getArticle(){
         console.log(this.articlesList.length)
           for (let i = 0; i < this.articlesList.length; i++){
              console.log("0000")
              console.log("loop longueur: " + this.articlesList.length)
              console.log("loop id: " + this.id)
               if(this.id == this.articlesList[i].id) {
                 console.log("1234")
                   this.article = this.articlesList[i];
                   console.log("getArticle: " + this.article)
               }
           }
       }
     }
};*/

import firebase from "firebase";

export default {
  props:['id'],
  
     data(){
        return {
            articlesId:"",
            articleSelected:[],
        }
     },
     created(){
       this.articlesId=this.getIDfromURL();
       console.log(this)
       console.log(this.articlesId);
       this.display(this.articlesId, this.articleSelected);
       //console.log(this.articleSelected)
     },
     mounted: function(){
       //this.display(this.articlesId);
       //this.display(this.articlesId);
     },
     methods:{
       display: function(id, list){ 
         //list = [];
         let ref = firebase.database().ref('articles');
            ref.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    console.log(childData);
                      const articleSlct = {
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
                    if (childKey == id){
                      console.log(childKey);
                      list.push(articleSlct);
                      console.log("1 " + list.length)
                    }
                });
            });
       },
       getIDfromURL: function(){
        return window.location.pathname.split('/')[2];
      }
       
     }
};
</script>