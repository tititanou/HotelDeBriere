<template>
  <div id="app" class="container">
    <br />
    <h1>Intégration bootstrap</h1>
    <br />
    <p>
      <b-btn v-b-toggle.collapse1 variant="warning">Toggle Collapse</b-btn>
    </p>
    <b-collapse id="collapse1">
      <b-card>
        Collapse contents Here
        <b-btn v-b-toggle.collapse2 size="sm">Toggle Inner Collapse</b-btn>
        <b-collapse id=collapse2 class="mt-2">
          <b-card>Hello!</b-card>
        </b-collapse>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style lang="scss">
  @import "./assets/custom.scss";
  @import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>