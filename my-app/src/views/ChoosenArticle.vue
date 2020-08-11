<template>
  <div>
      <b-container>
    <div v-if="articleSelected[0].video"
        class="mb-4 embed-responsive embed-responsive-16by9">
        <iframe class="col-12 embed-responsive-item" :src="articleSelected[0].video"  frameborder="0"></iframe>
    </div>
    <div v-else>
        <img :src="articleSelected[0].picture" class="col-12">
    </div>
    <div>
        <h1>{{articleSelected[0].title}}</h1>
        <h3>{{articleSelected[0].subtitle}}</h3>
    <div class="row">
        <div class="col">{{articleSelected[0].releaseDate}}</div> 
        <div class="col">{{articleSelected[0].autor}}</div>  
        <div class="col">{{articleSelected[0].category}}</div>
    </div>
        
        <div v-html="articleSelected[0].content"></div>
    </div>
</b-container>
  </div>
</template>




<script>

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
     },
     mounted: function(){
     },
     methods:{
       display: function(id, list){ 
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
                        picture: childData.picture,
                        video: childData.video
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
        return window.location.pathname.split('article')[1];
      }
       
     }
};
</script>