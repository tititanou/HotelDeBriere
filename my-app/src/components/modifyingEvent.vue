<template>
  <div>
    <h1>Modification de l'événement:</h1>
    <div v-if="isConnected && isAdmin">
      <b-form v-on:keypress.enter.prevent @submit="onSubmit" v-if="show">
        <b-form-group label="Titre:">
          <b-form-input v-model="eventSelected[0].title" type="text" required placeholder="Titre"></b-form-input>
        </b-form-group>

        <b-form-group label="Résumé:">
          <b-form-textarea
            v-model="eventSelected[0].abstract"
            placeholder="Résumé"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group label="Contenu de l'évenement:">
          <b-form>
            <vue-editor
              label="Contenu de l'évenement:"
              required
              v-model="eventSelected[0].content"
              style="background-color: white;"
            ></vue-editor>
          </b-form>
        </b-form-group>

        <b-form-group label="Date de l'événement:">
          <b-form-datepicker v-model="eventSelected[0].releaseDate" required class="mb-2"></b-form-datepicker>
        </b-form-group>

        <b-form-group label="Photo de présentation:">
          <b-form v-model="eventSelected[0].picture">
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
              <img class="preview" required :src="eventSelected[0].picture" />
              <br />
              <b-button variant="primary" @click.prevent="onUpload">Importer l'image</b-button>
            </div>
          </b-form>
        </b-form-group>

        <b-form-group label="Média de présentation:" description="facultatif">
          <b-form-input
            v-model="eventSelected[0].media"
            type="text"
            placeholder="Lien vers un média"
          ></b-form-input>
          <b-checkbox
            v-model="eventSelected[0].is3DReal"
          >Cocher si c'est une réalisation 3D SketchFab</b-checkbox>
        </b-form-group>

        <div class="mt-5">
          <h1>Prévisualisation de l'évenement:</h1>
          <div>
            <h2>Vignette:</h2>
            <b-card
              :title="eventSelected[0].title"
              :img-src="eventSelected[0].picture"
              img-alt="Image"
              img-top
              img-width="max-whidth: 50rem"
              img-height="max-height: 50rem"
              tag="article"
              style="max-width: 50rem;"
              class="mb-4"
            >
              <b-card-text>{{eventSelected[0].abstract}}</b-card-text>

              <b-button href="#" variant="primary">Lire la suite</b-button>
            </b-card>
          </div>
          <div>
            <h2>Page Complète:</h2>
            <b-card>
              <div
                v-if="eventSelected[0].media && eventSelected[0].is3DReal == false"
                class="mb-4 embed-responsive embed-responsive-16by9"
              >
                <iframe
                  class="col-12 embed-responsive-item"
                  :src="eventSelected[0].media"
                  frameborder="0"
                ></iframe>
              </div>
              <div v-if="eventSelected[0].media && eventSelected[0].is3DReal">
                <div class="sketchfab-embed-wrapper mb-4 embed-responsive embed-responsive-16by9">
                  <iframe
                    class="col-12 embed-responsive-item"
                    title="A 3D model"
                    :src="eventSelected[0].media"
                    frameborder="0"
                    allow="autoplay; fullscreen; vr"
                    mozallowfullscreen="true"
                    webkitallowfullscreen="true"
                  ></iframe>
                </div>
              </div>
              <div v-else>
                <img :src="eventSelected[0].picture" class="col-12" />
              </div>
              <div>
                <h1>{{eventSelected[0].title}}</h1>
                <div class="row">
                  <div class="col">{{eventSelected[0].releaseDate}}</div>
                </div>
                <div v-html="eventSelected[0].content"></div>
              </div>
            </b-card>
          </div>
        </div>
        <b-button class="mx-3 my-3" type="submit" variant="primary">Enregistrer la modification</b-button>
      </b-form>

      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ eventSelected[0] }}</pre>
      </b-card>
    </div>
    <b-card class="mb-4" v-else-if="isConnected && !isAdmin">
      <p>Accès refusé! Vous devez être administrateur pour accéder au contenu de cette page.</p>
      <b-button variant="primary" href="/">Retour à l'acceuil</b-button>
    </b-card>
    <b-card class="mb-4" v-else>
      <p>Accès refusé! Vous devez vous connecter.</p>
      <b-button variant="primary" href="/">Retour à l'acceuil</b-button>
      <b-button variant="primary" href="inscriptionConnexion">Se connecter</b-button>
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
      eventsId: "",
      eventSelected: [],
      show: true,
      isConnected: false,
      isAdmin: false,
      user: "",
      currentU: {
        firstname: "",
        name: "",
        admin: false,
      },
    };
  },
  created() {
    this.user = firebase.auth().currentUser;
    if (this.user != null) {
      this.isConnected = true;
      console.log("blabla" + this.isConnected)
    }
    this.eventsId = this.getIDfromURL();
  },
  mounted: function () {
    let self = this;
    let id = this.getIDfromURL();
    firebase
      .database()
      .ref("events")
      .on("value", function (snapshot) {
        let returnArr = [];
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.key == id) {
            returnArr.push(childSnapshot.val());
            // Fill the local data property with Firebase data
            self.eventSelected = returnArr;
          }
        });
      });
    self.user = firebase.auth().currentUser;
    const usersRef = firebase.database().ref("users");
    usersRef.on("value", (snapshot) => {
      let data = snapshot.val();
      let users = [];
      Object.keys(data).forEach((key) => {
        if (key == self.user.uid) {
          users.push({
            firstname: data[key].firstname,
            name: data[key].name,
            admin: data[key].admin,
          });
        }
      });
      if (users.length > 0) {
        self.currentU.firstname = users[0].firstname;
        self.currentU.name = users[0].name;
        self.currentU.admin = users[0].admin;
        self.isAdmin = self.currentU.admin;
      }
    });
  },
  methods: {
    getIDfromURL: function () {
      return window.location.pathname.split("modifyingEvent")[1];
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    onSubmit(evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.form))
      if (
        this.eventSelected[0].abstract.length == 0 ||
        this.eventSelected[0].abstract.length > 280
      ) {
        alert("Vous devez écrire un résumé de 280 caractères maximum.");
      } else if (this.eventSelected[0].content.length == 0) {
        alert("Vous devez écrire un contenu pour cet événement.");
      } else if (this.eventSelected[0].releaseDate.length == 0) {
        alert("Vous devez entrer une date.");
      } else if (this.eventSelected[0].picture.length == 0) {
        alert("Vous devez entrer une image.");
      } else {
        console.log(this.eventSelected[0].content.length);
        firebase
          .database()
          .ref("events/" + this.eventsId)
          .set({
            title: this.eventSelected[0].title,
            abstract: this.eventSelected[0].abstract,
            content: this.eventSelected[0].content,
            releaseDate: this.eventSelected[0].releaseDate,
            picture: this.eventSelected[0].picture,
            media: this.eventSelected[0].media,
            is3DReal: this.eventSelected[0].is3DReal,
          })
          .then(alert("Votre événement a été modifié avec succès."));
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
            this.eventSelected[0].picture = url;
          });
        }
      );
    },
  },
};
</script>


<style scoped>
img.preview {
  width: 200px;
}

img.view {
  width: auto;
}
</style>
