<template>
<b-container>
    <div>
        <h1>Création de l'article:</h1>
        <div>
            
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                
                <b-form-group id="input-group-1" label="Titre:" label-for="input-1">
                    <b-form-input id="input-1" v-model="form.title" type="text" required placeholder="Titre"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Sous-titre:"  label-for="input-2" description="Facultatif">
                    <b-form-input id="input-2" v-model="form.subtitle" placeholder="Sous-titre"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-4" label="Résumé:" label-for="input-4">
                    <b-form-textarea id="textarea" v-model="form.abstract" placeholder="Résumé" rows="3" max-rows="6"></b-form-textarea>
                </b-form-group>

                <b-form-group id="input-group-3" label="Contenu de l'article:" label-for="input-3" >
                    <b-form>
                        <vue-editor label="Contenu de l'article:" id="input-3" required v-model="form.content"></vue-editor>
                    </b-form>
                </b-form-group>

                <b-form-group 
                    id="input-group-4" 
                    label="Date de mise en ligne:" 
                    label-for="input-4"
                >
                    <b-form-datepicker id="input-4" v-model="form.releaseDate" required class="mb-2"></b-form-datepicker>
                </b-form-group>

                <b-form-group 
                    id="input-group-4" 
                    label="Categorie:" 
                    label-for="input-4"
                >
                    <b-form-input list="input-list" id="input-with-list" required v-model="form.category"></b-form-input>
                    <b-form-datalist id="input-list" :options="options"></b-form-datalist>
                </b-form-group>

                <b-form-group id="input-group-4" label="Auteur de l'article:" label-for="input-4">
                    <b-form-input id="input-1" v-model="form.autor" type="text" required placeholder="Auteur"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-4" label="Photo de présentation:" label-for="input-4">
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

                <b-form-group label="Video de présentation" description="facultatif">
                    <b-form-input id="input-1" v-model="form.video" type="text" placeholder="Lien vers une vidéo"></b-form-input>
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
                <div v-if="form.video"
                class="mb-4 embed-responsive embed-responsive-16by9"

                >
                <iframe class="col-12 embed-responsive-item" :src="form.video"  frameborder="0"></iframe>
                </div>
                <div v-else>
                    <img :src="form.picture" class="col-12">
                </div>
                <div>
                    <h1>{{form.title}}</h1>
                    <h3>{{form.subtitle}}</h3>
                <div class="row">
                    <div class="col">{{form.releaseDate}}</div> 
                    <div class="col">{{form.autor}}</div>  
                    <div class="col">{{form.category}}</div>
                </div>
                
                <div v-html="form.content"></div>
                </div>

        </div>
    </div>
    <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>

            </b-form>

            <!--<b-card class="mt-3" header="Form Data Result">
                <pre class="m-0">{{ form }}</pre>
                <pre class="m-0">{{ picture }}</pre>
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
            category: '',
            picture: '',
            video: '',
        },
        options: ['Apple', 'Banana', 'Grape', 'Kiwi', 'Orange'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        //alert(JSON.stringify(this.form))
        if(this.form.abstract.length == 0 || this.form.abstract.length > 280){
            alert("Vous devez écrire un résumé")
        }
        else if (this.form.content.length == 0){
            alert("Vous devez écrire un article de 280 caractères maximum.")
        }
        else if (this.form.releaseDate.length == 0){
            alert("Vous devez entrer une date.")
        }
        else if (this.form.picture.length == 0){
            alert("Vous devez entrer une image.")
        }
        else{
            console.log(this.form.content.length)
            firebase.database().ref('articles/').push({
                title: this.form.title,
                subtitle: this.form.subtitle,
                abstract: this.form.abstract,
                content: this.form.content,
                releaseDate: this.form.releaseDate,
                autor: this.form.autor,
                category: this.form.category,
                picture: this.form.picture,
                video: this.form.video,
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
        this.form.category = ''
        this.form.picture = ''
        this.form.video = ''
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