<template>
    <div class="mt-5">
        <b-container>
            <b-row>
                <b-col lg="3" md="12" sm="12" class="mb-5 mx-auto">
                    <homePresentation />            
                </b-col>
                <b-col lg="5" md="12" sm="12" class="my-5 mx-auto">
                        <homeArticle />
                        <homeArticle />      
                        <homeArticle />
                </b-col>
                <b-col lg="3" md="12" sm="12" class="mb-5 mx-auto">
                    <homeProvisoire /> 
                    <homeProvisoire /> 
                    <homeProvisoire /> 
                    <homeProvisoire /> 
                    <homeProvisoire /> 
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

import homePresentation from "@/components/homePresentation.vue";
import homeArticle from "@/components/homeArticle.vue";
import homeProvisoire from "@/components/homeProvisoire.vue";


export default {
    components: {
      homePresentation,
      homeArticle,
      homeProvisoire,
    }
}
</script>

<style scoped>
    
</style>