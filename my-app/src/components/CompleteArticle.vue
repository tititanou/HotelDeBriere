<template>
<b-container>
    <b-card
                :img-src="article.picture"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-4"
                >
                <h1>{{article.title}}</h1>
                <h3>{{article.subtitle}}</h3>
                <div class="row">
                    <div class="col">{{article.releaseDate}}</div> 
                    <div class="col">{{article.autor}}</div>  
                    <div class="col">{{article.category}}</div>
                </div>
                
                <b-card-text v-html="article.content"></b-card-text>
                </b-card>
</b-container>
</template>
<script>
export default {
    props: {
    article: Object,
    }    
}      
</script>
