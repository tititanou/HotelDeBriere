<template>
  <b-container>
    <div>
      <h1>Création d'un événement:</h1>
      <div v-if="isConnected && isAdmin">
        <b-form v-on:keypress.enter.prevent @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group label="Titre:">
            <b-form-input v-model="form.title" type="text" required placeholder="Titre"></b-form-input>
          </b-form-group>

          <b-form-group label="Résumé:">
            <b-form-textarea v-model="form.abstract" placeholder="Résumé" rows="3" max-rows="6"></b-form-textarea>
          </b-form-group>

          <b-form-group label="Contenu de l'événement:">
            <b-form>
              <vue-editor label="Contenu de l'événement:" required v-model="form.content" style="background-color: white;"></vue-editor>
            </b-form>
          </b-form-group>

          <b-form-group label="Date de l'événement:">
            <b-form-datepicker v-model="form.releaseDate" locale="fr" required class="mb-2"></b-form-datepicker>
          </b-form-group>

          <b-form-group label="Photo de présentation:">
            <b-form v-model="picture">
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
                <img class="preview" required :src="form.picture" />
                <br />
                <button @click.prevent="onUpload">Importer l'image</button>
              </div>
            </b-form>
          </b-form-group>

          <b-form-group label="Média de présentation:" description="facultatif">
            <b-form-input v-model="form.media" type="text" placeholder="Lien vers un média"></b-form-input>
            <b-checkbox v-model="form.is3DReal">Cocher si c'est une réalisation 3D SketchFab</b-checkbox>
          </b-form-group>

          <div class="mt-5">
            <h1>Prévisualisation de l'évenement:</h1>
            <div>
              <h2>Vignette:</h2>
              <b-card
                :title="form.releaseDate"
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
                  <h1>{{form.title}}</h1>
                  {{form.abstract}}
                </b-card-text>

                <b-button href="#" variant="primary">Lire la suite</b-button>
              </b-card>
            </div>
            <br />
            <div>
              <h2>Page Complète:</h2>
              <b-card>
                <div
                  v-if="form.media && form.is3DReal == false"
                  class="mb-4 embed-responsive embed-responsive-16by9"
                >
                  <iframe class="col-12 embed-responsive-item" :src="form.media" frameborder="0"></iframe>
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
                    ></iframe>
                  </div>
                </div>
                <div v-else>
                  <img :src="form.picture" class="col-12" />
                </div>
                <div>
                  <h1>{{form.title}}</h1>

                  <div class="row">
                    <h1>Evénement prévu le : {{form.releaseDate}}</h1>
                  </div>

                  <div v-html="form.content"></div>
                </div>
              </b-card>
            </div>
          </div>
          <b-button class="mt-3 btn-valid" type="submit">Enregistrer l'événement</b-button>
          <b-button class="mx-5 mt-3" type="reset" variant="danger">Reset</b-button>
        </b-form>

        <!--<b-card class="mt-3" header="Form Data Result">
                <pre class="m-0">{{ form }}</pre>
                
        </b-card>-->
      </div>
      <b-card class="mb-4" v-else-if="isConnected && !isAdmin">
        <p>Accès refusé! Vous devez être administrateur pour accéder au contenu de cette page.</p>
        <b-button variant="primary" href="/">Retour à l'acceuil</b-button>
      </b-card>
      <b-card class="mb-4" v-else>
        <p>Accès refusé! Vous devez vous connecter.</p>
        <b-button variant="primary" href="/">Retour à l'acceuil</b-button>
        <b-button class="mx-2" variant="primary" href="inscriptionConnexion">Se connecter</b-button>
      </b-card>
    </div>
  </b-container>
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
      isConnected: false,
      isAdmin: false,
      user: "",
      currentU: {
        firstname: "",
        name: "",
        admin: false,
      },
      imageData: null,
      picture: null,
      uploadValue: 0,
      form: {
        title: "",
        subtitle: "",
        tabs: [],
        subTabs: [],
        abstract: "",
        content: "",
        releaseDate: "",
        autor: "",
        tags: [],
        picture: "",
        media: "",
        is3DReal: false,
      },
      tab: "",
      propTabs: [],
      subTab: "",
      propSubTabs: [],
      tag: "",
      propTags: [],
      show: true,
    };
  },
  created() {
    this.user = firebase.auth().currentUser;
    if (this.user != null) {
      this.isConnected = true;
    }
    this.display(this.propTags);
    this.displayTabs(this.propTabs);
  },
  methods: {
    display(list) {
      let ref = firebase.database().ref("tags");
      ref.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          console.log(childKey);
          list.push(childKey);
        });
      });
    },
    displayTabs(list) {
      let ref = firebase.database().ref("tabs");
      ref.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          console.log(childKey);
          list.push(childKey);
        });
      });
    },
    displaySubTabs(list) {
      let self = this;
      console.log("coucou");
      let ref = firebase
        .database()
        .ref("tabs/" + self.form.tabs[0] + "/subTab");
      ref.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          if (childData != "") {
            list.push(childData);
          }
        });
        console.log("la liste= " + list);
      });
      console.log(list.length + " et la liste est " + list);
    },
    onSubmit(evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.form))
      if (this.form.abstract.length == 0 || this.form.abstract.length > 280) {
        alert("Vous devez écrire un résumé de 280 caractères maximum.");
      } else if (this.form.content.length == 0) {
        alert("Vous devez écrire un article.");
      } else if (this.form.releaseDate.length == 0) {
        alert("Vous devez entrer une date.");
      } else if (this.form.picture.length == 0) {
        alert("Vous devez entrer une image.");
      } else {
        firebase
          .database()
          .ref("events/")
          .push({
            title: this.form.title,
            abstract: this.form.abstract,
            content: this.form.content,
            releaseDate: this.form.releaseDate,
            picture: this.form.picture,
            media: this.form.media,
            is3DReal: this.form.is3DReal,
          })
          .then(alert("Votre événement a été créé avec succès.")).then(window.location.reload());
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.title = "";
      this.form.abstract = "";
      this.form.content = "";
      this.form.releaseDate = "";
      this.form.picture = "";
      this.form.media = "";
      this.form.is3DReal = false;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
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
            this.form.picture = url;
          });
        }
      );
    },
  },
  mounted() {
    let viewUser = this;
    viewUser.user = firebase.auth().currentUser;
    const usersRef = firebase.database().ref("users");
    usersRef.on("value", (snapshot) => {
      let data = snapshot.val();
      let users = [];
      Object.keys(data).forEach((key) => {
        if (key == viewUser.user.uid) {
          users.push({
            firstname: data[key].firstname,
            name: data[key].name,
            admin: data[key].admin,
          });
        }
      });
      if (users.length > 0) {
        viewUser.currentU.firstname = users[0].firstname;
        viewUser.currentU.name = users[0].name;
        viewUser.currentU.admin = users[0].admin;
        viewUser.isAdmin = viewUser.currentU.admin;
      }
    });
  },
};
</script>

<style scoped="">
@import "../assets/custom.scss";
img.preview {
  width: 200px;
}
img.view {
  width: auto;
}
.btn-valid{
  background-color: rgb(97, 167, 140);
  border-color: rgb(97, 167, 140);
}
</style>