<template>
<b-container>
    <div>
        <h1>Création de l'article:</h1>
        <div>
            
            <b-form v-on:keypress.enter.prevent @submit="onSubmit" @reset="onReset" v-if="show">
                
                <b-form-group label="Titre:">
                    <b-form-input v-model="form.title" type="text" required placeholder="Titre"></b-form-input>
                </b-form-group>

                <b-form-group label="Sous-titre:" description="Facultatif">
                    <b-form-input v-model="form.subtitle" placeholder="Sous-titre"></b-form-input>
                </b-form-group>

                <b-form-group label="Résumé:">
                    <b-form-textarea v-model="form.abstract" placeholder="Résumé" rows="3" max-rows="6"></b-form-textarea>
                </b-form-group>

                <b-form-group label="Contenu de l'article:">
                    <b-form>
                        <vue-editor label="Contenu de l'article:" required v-model="form.content"></vue-editor>
                    </b-form>
                </b-form-group>

                <b-form-group label="Date de mise en ligne:">
                    <b-form-datepicker v-model="form.releaseDate" required class="mb-2"></b-form-datepicker>
                </b-form-group>

                <b-form-group label="Catégorie:">
                    <b-form-input placeholder="Ajouter une catégorie en appuyant sur Entrée" list="input-list" v-model="tag" @keyup="handleTyping"></b-form-input>
                    <b-form-datalist id="input-list" :options="propTags"></b-form-datalist>
                    <div class="tags mt-2">
                        <div v-for="(_tag, index) in form.tags" :key="index" class="tag" @click="removeTag(index)">{{ _tag }}</div>
                    </div>                
                </b-form-group>
                <!--<b-form-input type="text" placeholder="Add tags separated by ," v-model="tag" @keyup="handleTyping"></b-form-input>
                <label>Tags</label>
                <div class="tags">
                    <div v-for="(_tag, index) in tags" :key="index" class="tag" @click="removeTag(index)">{{ _tag }}</div>
                </div>-->
                <b-form-group label="Auteur de l'article:">
                    <b-form-input v-model="form.autor" type="text" required placeholder="Auteur"></b-form-input>
                </b-form-group>

                <b-form-group label="Photo de présentation:">
                   <b-form v-model="picture">
                       <div >
                            <input type="file" @change="previewImage" accept="image/*" >
                        </div>
                        <div>
                            <p>Progress: {{uploadValue.toFixed()+"%"}}
                            <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
                        </div>
                        <div v-if="imageData!=null">
                            <img class="preview" required :src="form.picture">
                            <br>
                            <button @click.prevent="onUpload">Upload</button>
                        </div>
                   </b-form>
                </b-form-group>

                <b-form-group label="Média de présentation:" description="facultatif">
                    <b-form-input v-model="form.media" type="text" placeholder="Lien vers un média"></b-form-input>
                    <b-checkbox v-model="form.is3DReal">Cocher si c'est une réalisation 3D SketchFab</b-checkbox>
                </b-form-group>

        <div class="mt-5">
            <h1>Prévisualisation de l'article:</h1>
            <div>
                <h2>Vignette:</h2>
                <b-card
                :title="form.title"
                :img-src="form.picture"
                img-alt="Image"
                img-top
                img-width="max-whidth: 50rem"
                img-height="max-height: 50rem"
                tag="article"
                style="max-width: 50rem;"
                class="mb-4"
            >
                <b-card-text>
                    {{form.abstract}}
                </b-card-text>

                <b-button href="#" variant="primary">Lire la suite</b-button>
                </b-card>
            </div>
            <div>
                <h2>Page Complète:</h2> 
                <b-card>
                <div v-if="form.media && form.is3DReal == false"
                class="mb-4 embed-responsive embed-responsive-16by9"
                >
                <iframe class="col-12 embed-responsive-item" :src="form.media"  frameborder="0"></iframe>
                </div>
                <div v-if="form.media && form.is3DReal">
                    <div class="sketchfab-embed-wrapper mb-4 embed-responsive embed-responsive-16by9">
                        <iframe 
                            class="col-12 embed-responsive-item"
                            title="A 3D model"
                            :src="form.media" 
                            frameborder="0" 
                            allow="autoplay; fullscreen; vr" 
                            mozallowfullscreen="true" 
                            webkitallowfullscreen="true"
                            >
                        </iframe>
                    </div>
                </div>
                <div v-else>
                    <img :src="form.picture" class="col-12">
                </div>
                <div>
                    <h1>{{form.title}}</h1>
                    <h3>{{form.subtitle}}</h3>
                <div class="row">
                    <div class="col">Mis en ligne le: {{form.releaseDate}}</div> 
                    <div class="col">Ecrit part: {{form.autor}}</div>  
                    <div class="col">Catégories: 
                        <div class="raw" v-for="(_tag, index) in form.tags" :key="index">{{_tag}}</div>
                    </div>
                </div>
                
                <div v-html="form.content"></div>
                </div>
                </b-card>

        </div>
    </div>
    <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>

            </b-form>

            <!--<b-card class="mt-3" header="Form Data Result">
                <pre class="m-0">{{ form }}</pre>
                
            </b-card>-->
        </div>
    </div>
</b-container>
  
</template>

<script>
import firebase from 'firebase';
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor, 
    },
  
  data() {
    return {
        imageData: null,
        picture: null,
        uploadValue: 0,
        form: {
            title: '',
            subtitle: '',
            abstract:'',
            content: '',
            releaseDate: '',
            autor: '',
            tags: [],
            picture: '',
            media: '',
            is3DReal: false,
        },
        tag: '',
        propTags: [],
        show: true
      }
    },
    created(){
        this.display(this.propTags)
    },
    methods: {
        display(list){        
         let ref = firebase.database().ref('tags');
            ref.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    console.log(childKey);
                    list.push(childKey);
                });
            });
            console.log(list.length);
       
     },
    onSubmit(evt) {
    evt.preventDefault();
    //alert(JSON.stringify(this.form))
    if(this.form.abstract.length == 0 || this.form.abstract.length > 280){
        alert("Vous devez écrire un résumé de 280 caractères maximum.")
    }
    else if (this.form.content.length == 0){
        alert("Vous devez écrire un article.")
    }
    else if (this.form.releaseDate.length == 0){
        alert("Vous devez entrer une date.")
    }
    else if (this.form.picture.length == 0){
        alert("Vous devez entrer une image.")
    }
    else if (this.form.tags.length == 0){
        alert("Vous devez entrer au moins une catégorie.")
    }
    else{
        for(let i=0; i < this.form.tags.length; i++){
            firebase.database().ref('tags/'+ this.form.tags[i]).set({
                tag: this.form.tags[i]
            })
        }
        console.log(this.form.content.length)
        firebase.database().ref('articles/').push({
            title: this.form.title,
            subtitle: this.form.subtitle,
            abstract: this.form.abstract,
            content: this.form.content,
            releaseDate: this.form.releaseDate,
            autor: this.form.autor,
            tags: this.form.tags,
            picture: this.form.picture,
            media: this.form.media,
            is3DReal: this.form.is3DReal,
        }).then(alert("Votre article a été créé avec succès."));
    }
    },
    onReset(evt) {
    evt.preventDefault()
    // Reset our form values
    this.form.title = ''
    this.form.subtitle = ''
    this.form.abstract = ''
    this.form.content = ''
    this.form.releaseDate = ''
    this.form.autor = ''
    this.form.tags = []
    this.form.picture = ''
    this.form.media = ''
    this.form.is3DReal = false
    // Trick to reset/clear native browser form validation state
    this.show = false
    this.$nextTick(() => {
        this.show = true
    })
    },
    previewImage(event) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = event.target.files[0];
    },

    onUpload(){
      this.picture=null;
      const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          this.form.picture =url;
        });
      });
    },
    addTag(tag) {
        if(tag!= ''){
            if(this.form.tags.length < 3){
                let newTag = tag.toLowerCase();
                this.form.tags.push(newTag);
            }
        }
    },
    removeTag(index) {
        this.form.tags.splice(index, 1);
    },
    tagExists(tag) {
        return this.form.tags.indexOf(tag) !== -1;
    },
    handleTyping(e) {
        if ( e.keyCode === 13 ) {
            let tag = this.tag.replace(/,/g, '');
            if ( !this.tagExists(tag) ) {
                this.addTag(tag);
                this.tag = '';
            }
        }
    },

    createArticle(){
        //var user = firebase.auth().currentUser;
        //console.log(user.uid);
        
    }

    }
  

  
};
</script>

<style scoped="">
img.preview {
    width: 200px;
}

img.view {
    width: auto;
}

</style>