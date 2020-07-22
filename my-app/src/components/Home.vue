<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-3">
                <homePresentation />            
            </div>
            <div class="col-6 mt-5">
                    <homeArticle />
                    <homeArticle />      
                    <homeArticle />
            </div>
            <div class="col-3">
                <div class="row">
                    <p>blablabla</p>
                </div>
                <div class="row">
                    <p>blablabla</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import homePresentation from "@/components/homePresentation.vue";
import homeArticle from "@/components/homeArticle.vue";
//import homeProvisoire from "@/components/homeProvisoire.vue";


export default {
    components: {
      homePresentation,
      homeArticle,
      //homeProvisoire
    }
}
</script>

<style scoped>

</style>