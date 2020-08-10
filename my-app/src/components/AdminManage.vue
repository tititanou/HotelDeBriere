<template>
    <b-container>
        <b-card title="Portail administrateur" style="max-width: 45rem; min-width: 45rem; float:none;" class="mb-4 center-block">
            <b-card-group deck>
                <b-card border-variant="info" header="Articles" align="center">
                    <b-card-text>Ajouter, modifier ou supprimer des articles.</b-card-text>
                    <b-button href="newArticle">Y aller</b-button>
                </b-card>
                <b-card border-variant="info" header="Evènements" align="center">
                    <b-card-text>Ajouter, modifier ou supprimer des évènements.</b-card-text>
                    <b-button>Y aller</b-button>
                </b-card>
                <b-card border-variant="info" header="Publicité" align="center">
                    <b-card-text>Ajouter, modifier ou supprimer des publicités.</b-card-text>
                    <b-button>Y aller</b-button>
                </b-card>
                <b-card border-variant="info" header="Administrateurs" align="center">
                    <b-card-text>Ajouter ou supprimer des comptes administrateurs.</b-card-text>
                    <b-button>Y aller</b-button>
                </b-card>
            </b-card-group>
        </b-card>
    </b-container>
</template>