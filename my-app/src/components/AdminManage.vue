<template>
    <b-container>
        <b-card title="Portail administrateur" class="mb-4 ">
            <b-card-group deck>
                <b-col>
                    <b-row class="my-1">
                        <b-card title="Articles">
                            <b-col class="my-1">
                                <b-button variant="outline-secondary" block href="newArticle" size="lg">Ajouter un article</b-button>    
                            </b-col>
                            <b-col class="my-1">
                                <b-button variant="outline-secondary" block href="#" size="lg">Modifier ou supprimer un article</b-button>    
                            </b-col>
                        </b-card>
                    </b-row>
                    
                    <b-row class="my-1">
                        <b-card title="Evenements">
                            <b-col class="my-1">
                                <b-button variant="outline-secondary" block href="#" size="lg">Ajouter un événement</b-button>    
                            </b-col>
                            <b-col class="my-1">
                                <b-button variant="outline-secondary" block href="#" size="lg">Modifier ou supprimer un événement</b-button>    
                            </b-col>
                        </b-card>
                        
                    </b-row>
                    
                    <b-row class="my-1">
                        <b-card title="Publicité">
                            <b-col class="my-1">
                                <b-button variant="outline-secondary" block href="#" size="lg">Ajouter une publicité</b-button>    
                            </b-col>
                            <b-col class="my-1">
                                <b-button variant="outline-secondary" block href="#" size="lg">Modifier ou supprimer une publicité</b-button>    
                            </b-col>
                        </b-card>
                    </b-row>
                    
                    <b-row class="my-1">
                        <b-card title="Gestion Utilisateurs">
                            <b-button variant="outline-secondary" block href="#" size="lg">Gerer les administrateurs</b-button>
                        </b-card>
                    </b-row>
                </b-col>
            </b-card-group>
        </b-card>
    </b-container>
</template>