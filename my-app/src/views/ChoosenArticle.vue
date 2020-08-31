<template>
  <div>
    <b-container>
      <div v-if="articleSelected[0].media && articleSelected[0].is3DReal == false" class="mb-4 embed-responsive embed-responsive-16by9">
        <iframe class="col-12 embed-responsive-item" :src="articleSelected[0].video"  frameborder="0"></iframe>
      </div>
      <div v-if="articleSelected[0].media && articleSelected[0].is3DReal">
        <div class="sketchfab-embed-wrapper mb-4 embed-responsive embed-responsive-16by9">
          <iframe 
          class="col-12 embed-responsive-item"
          title="A 3D model"
          :src="articleSelected[0].media" 
          frameborder="0" 
          allow="autoplay; fullscreen; vr" 
          mozallowfullscreen="true" 
          webkitallowfullscreen="true"
          >
          </iframe>
        </div>
      </div>
      <div v-else>
        <img :src="articleSelected[0].picture" class="col-12">
      </div>
      <h1 class="my-3">{{articleSelected[0].title}}</h1>
      <h3 class="my-1">{{articleSelected[0].subtitle}}</h3>
      <div class="row my-1">
        <div class="col">Mis en ligne le: {{this.displayDate(articleSelected[0].releaseDate)}}</div> 
        <div class="col">Ecrit part: {{articleSelected[0].autor}}</div>  
        <div class="col">Catégories: 
            <div class="raw" v-for="(_tag, index) in articleSelected[0].tags" :key="index">{{_tag}}</div>
        </div>
      </div>
      <div class="my-4" v-html="articleSelected[0].content"></div>
    </b-container>
    <!--<button @click="download()">Exporter en PDF</button>-->
  </div>
</template>




<script>
import firebase from "firebase";
//import jspdf from 'jspdf';

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
       /*download(){
         const doc = new jspdf()
         const html = this.$ref.ArticleContent.innerHTML
         doc.fromHTML(html)
         doc.save("output.pdf")
       },*/
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
                        tags: childData.tags,
                        picture: childData.picture,
                        media: childData.media,
                        is3DReal: childData.is3DReal
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