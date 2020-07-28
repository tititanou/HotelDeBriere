<template>
  
  <div id="app">
    <Header />
    <body>
      <router-view />
    </body>
    <Footer />
  </div>
</template>

<script>

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
//import Home from "@/components/Home.vue";


  export default {
    components: {
      Header,
      Footer,
      //Home,
    },
  };

</script>

<style lang="scss">
  @import "./assets/custom.scss";
  @import "../node_modules/bootstrap/scss/bootstrap.scss";
  body{
    background-color: rgb(239, 241, 241);
  }
</style>