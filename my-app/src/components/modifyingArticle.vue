<template>
  <div>
    <h1>Modification de l'article:</h1>
    <div v-if="isConnected && isAdmin">
      
      <b-form v-on:keypress.enter.prevent @submit="onSubmit" v-if="show">
        <b-form-group label="Titre:">
          <b-form-input v-model="articleSelected[0].title" type="text" required placeholder="Titre"></b-form-input>
        </b-form-group>

        <b-form-group label="Sous-titre:" description="Facultatif">
          <b-form-input v-model="articleSelected[0].subtitle" placeholder="Sous-titre"></b-form-input>
        </b-form-group>

          <b-form-group label="Onglet:" description="Appuyez sur entrée pour valider votre choix.">
            <b-form-input
              placeholder="Ajouter un onglet en appuyant sur Entrée"
              list="tab-input-list"
              v-model="tab"
              @keyup="handleTypingTab"
            ></b-form-input>
            <b-form-datalist id="tab-input-list" :options="propTabs"></b-form-datalist>
          </b-form-group>

          <b-form-group label="Sous-Onglet:" description="Ne pas entrer de sous-onglet si votre onglet principal est déjà instancié et ne comporte pas de sous-onglet. Ce choix reste facultatif.">
            <b-form-input
              placeholder="Sous-onglet"
              list="subTab-input-list"
              v-model="subTab"
            ></b-form-input>
            <b-form-datalist id="subTab-input-list" :options="propSubTabs"></b-form-datalist>
          </b-form-group>

        <b-form-group label="Résumé:">
          <b-form-textarea
            v-model="articleSelected[0].abstract"
            placeholder="Résumé"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group label="Contenu de l'article:">
          <b-form>
            <vue-editor
              label="Contenu de l'article:"
              required
              v-model="articleSelected[0].content"
              style="background-color: white;"
            ></vue-editor>
          </b-form>
        </b-form-group>

        <b-form-group label="Date de mise en ligne:">
          <b-form-datepicker v-model="articleSelected[0].releaseDate" required class="mb-2"></b-form-datepicker>
        </b-form-group>

        <b-form-group label="Catégorie:">
          <b-form-input
            placeholder="Ajouter une catégorie en appuyant sur Entrée"
            list="input-list"
            v-model="tag"
            @keyup="handleTyping"
          ></b-form-input>
          <b-form-datalist id="input-list" :options="propTags"></b-form-datalist>
          <div class="tags mt-2">
            <div
              v-for="(_tag, index) in articleTags"
              :key="index"
              class="tag"
              @click="removeTag(index)"
            >{{ _tag }}</div>
          </div>
        </b-form-group>

        <b-form-group label="Auteur de l'article:">
          <b-form-input
            v-model="articleSelected[0].autor"
            type="text"
            required
            placeholder="Auteur"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Photo de présentation:">
          <b-form v-model="articleSelected[0].picture">
            <div>
              <input type="file" @change="previewImage" accept="image/*" />
            </div>
            <div>
              <p>
                Progression: {{uploadValue.toFixed()+"%"}}
                <progress
                  id="progress"
                  :value="uploadValue"
                  max="100"
                ></progress>
              </p>
            </div>
            <div v-if="imageData!=null">
              <img class="preview" required :src="articleSelected[0].picture" />
              <br />
              <b-button variant="primary" @click.prevent="onUpload">Importer l'image</b-button>
            </div>
          </b-form>
        </b-form-group>
        
        <b-form-group label="Média de présentation:" description="facultatif">
          <b-form-input
            v-model="articleSelected[0].media"
            type="text"
            placeholder="Lien vers un média"
          ></b-form-input>
          <b-checkbox
            v-model="articleSelected[0].is3DReal"
          >Cocher si c'est une réalisation 3D SketchFab</b-checkbox>
        </b-form-group>
        
        <div class="mt-5">
          <h1>Prévisualisation de l'article:</h1>
          <div>
            <h2>Vignette:</h2>
            <b-card
              :title="articleSelected[0].title"
              :img-src="articleSelected[0].picture"
              img-alt="Image"
              img-top
              img-width="max-whidth: 50rem"
              img-height="max-height: 50rem"
              tag="article"
              style="max-width: 50rem;"
              class="mb-4 bg-card "
            >
              <b-card-text>{{articleSelected[0].abstract}}</b-card-text>

              <b-button class="btn-valid" href="#">Lire la suite</b-button>
            </b-card>
          </div>
          <div>
            <h2>Page Complète:</h2>
            <b-container class="border border-dark">
              <div
                v-if="articleSelected[0].media && articleSelected[0].is3DReal == false"
                class="mb-4 embed-responsive embed-responsive-16by9"
              >
                <iframe
                  class="col-12 embed-responsive-item"
                  :src="articleSelected[0].media"
                  frameborder="0"
                ></iframe>
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
                  ></iframe>
                </div>
              </div>
              <div v-else>
                <img :src="articleSelected[0].picture" class="col-12" />
              </div>
              <div>
                <h1>{{articleSelected[0].title}}</h1>
                <h3>{{articleSelected[0].subtitle}}</h3>
                <div class="row">
                  <div class="col">Mis en ligne le: {{articleSelected[0].releaseDate}}</div>
                  <div class="col">Ecrit part: {{articleSelected[0].autor}}</div>
                  <div class="col">
                    Catégories:
                    <div
                      class="raw"
                      v-for="(_tag, index) in articleTags"
                      :key="index"
                    >{{_tag}}</div>
                  </div>
                </div>

                <div v-html="articleSelected[0].content"></div>
              </div>
            </b-container>
          </div>
        </div>
        <b-button class="mx-3 my-3 btn-valid" type="submit">Enregistrer la modification</b-button>
      </b-form>

      <!--<b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ articleSelected[0] }}</pre>
      </b-card>-->
    </div>
    <b-card class="mb-4 " v-else-if="isConnected && !isAdmin">
      <p>Accès refusé! Vous devez être administrateur pour accéder au contenu de cette page.</p>
      <b-button class="btn-valid" href="/">Retour à l'acceuil</b-button>
    </b-card>
    <b-card class="mb-4 " v-else>
      <p>Accès refusé! Vous devez vous connecter.</p>
      <b-button class="btn-valid" href="/">Retour à l'acceuil</b-button>
      <b-button class="btn-valid" href="inscriptionConnexion">Se connecter</b-button>
    </b-card>
  </div>
</template>

<script>
import firebase from "firebase";
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
      articlesId: "",
      articleSelected: [],
      tag: "",
      propTags: [],
      tab: "",
      propTabs: [],
      subTab: "",
      propSubTabs: [],
      show: true,
      articleTags: [],
      isConnected: false,
      isAdmin: false,
      user: '',
      currentU:{
        firstname:'',
        name:'',
        admin:false
      }
    };
  },
  created() {
    this.user = firebase.auth().currentUser;
    if (this.user != null){
      this.isConnected = true;
    }
    this.articlesId = this.getIDfromURL();
    this.displayPropTags(this.propTags);
    this.displayPropTabs(this.propTabs);
  },
  mounted: function () {
    let self = this;
    let id = this.getIDfromURL();
    firebase
      .database()
      .ref("articles")
      .on("value", function (snapshot) {
        let returnArr = [];
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.key == id) {
            returnArr.push(childSnapshot.val());
            // Fill the local data property with Firebase data
            self.articleSelected = returnArr;
            self.articleTags = self.articleSelected[0].tags;
            self.tab = self.articleSelected[0].tab;
            self.subTab = self.articleSelected[0].subTab;
          }
        });
      });
      self.user = firebase.auth().currentUser;
      console.log(self.user)
      const usersRef = firebase.database().ref("users");
      usersRef.on("value", snapshot => {
          let data = snapshot.val();
          let users = [];
          Object.keys(data).forEach(key =>{
            if (key == self.user.uid){
              users.push({
                firstname: data[key].firstname,
                name: data[key].name,
                admin: data[key].admin
              });
            }
          });
          if(users.length > 0) {
            self.currentU.firstname = users[0].firstname;
            self.currentU.name = users[0].name;
            self.currentU.admin = users[0].admin;
            self.isAdmin = self.currentU.admin;
            }
        });
  },
  methods: {
    displayPropTags(list) {
      let ref = firebase.database().ref("tags");
      ref.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          list.push(childKey);
        });
      });
    },
    displayPropTabs(list) {
      let ref = firebase.database().ref("tabs");
      ref.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          list.push(childKey);
        });
      });
    },
    displayPropSubTabs(list) {
      let self = this;
      console.log("coucou");
      let ref = firebase
        .database()
        .ref("tabs/" + self.tab + "/subTab");
      ref.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          if (childData != "") {
            list.push(childData.subTab);
          }
        });
        console.log("la liste= " + list);
      });
      console.log(list.length + " et la liste est " + list);
    },
    getIDfromURL: function () {
      return window.location.pathname.split("modifyingArticle")[1];
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    onSubmit(evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.form))
      if (this.articleSelected[0].abstract.length == 0 || this.articleSelected[0].abstract.length > 280) {
        alert("Vous devez écrire un résumé de 280 caractères maximum.");
      } else if (this.articleSelected[0].content.length == 0) {
        alert("Vous devez écrire un article.");
      } else if (this.articleSelected[0].releaseDate.length == 0) {
        alert("Vous devez entrer une date.");
      } else if (this.articleSelected[0].picture.length == 0) {
        alert("Vous devez entrer une image.");
      } else if (this.articleSelected[0].tags.length == 0) {
        alert("Vous devez entrer au moins une catégorie.");
      } else {
        for (let i = 0; i < this.articleTags.length; i++) {
          firebase
            .database()
            .ref("tags/" + this.articleTags[i])
            .set({
              tag: this.articleTags[i],
            });
        }
        console.log(this.articleSelected[0].content.length);
        firebase
          .database()
          .ref("articles/" + this.articlesId)
          .set({
            title: this.articleSelected[0].title,
            subtitle: this.articleSelected[0].subtitle,
            tab: this.tab,
            subTab: this.subTab,
            abstract: this.articleSelected[0].abstract,
            content: this.articleSelected[0].content,
            releaseDate: this.articleSelected[0].releaseDate,
            autor: this.articleSelected[0].autor,
            tags: this.articleTags,
            picture: this.articleSelected[0].picture,
            media: this.articleSelected[0].media,
            is3DReal: this.articleSelected[0].is3DReal,
          })
          .then(alert("Votre article a été modifié avec succès.")).then(history.back());
      }
    },
    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.articleSelected[0].picture = url;
          });
        }
      );
    },
    addTag(tag) {
      if (tag != "") {
        if (this.articleTags.length < 3) {
          let newTag = tag.toLowerCase();
          this.articleTags.push(newTag);
        }
      }
    },
    removeTag(index) {
      this.articleTags.splice(index, 1);
    },
    tagExists(tag) {
      return this.articleTags.indexOf(tag) !== -1;
    },
    handleTyping(e) {
      if (e.keyCode === 13) {
        let tag = this.tag.replace(/,/g, "");
        if (!this.tagExists(tag)) {
          this.addTag(tag);
          this.tag = "";
        }
      }
    },
    handleTypingTab(e) {
      if (e.keyCode === 13) {
        this.propSubTabs = [];
        this.displayPropSubTabs(this.propSubTabs);
      }
    },
  },
};
</script>


<style scoped>
@import "../assets/custom.scss";
img.preview {
  width: 200px;
}

img.view {
  width: auto;
}

.bg-card{
	background-color: rgb(239, 241, 241);
}
</style>
