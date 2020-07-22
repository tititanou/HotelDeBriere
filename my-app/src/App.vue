<template>
  
  <div id="app">
    <header>
      <Header />
    </header>

    <body>
      <Home />
    </body>
      
    
    
  </div>
</template>

<script>

import Header from "@/components/Header.vue";
import Home from "@/components/Home.vue";

  export default {
    components: {
      Header,
      Home,
    }
  };

</script>

<style lang="scss">
  @import "./assets/custom.scss";
  @import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>