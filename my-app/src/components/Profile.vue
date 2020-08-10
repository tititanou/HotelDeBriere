<template>
    <b-card title="Mon profil" style="max-width: 45rem; min-width: 45rem; float:none;" class="mb-4 center-block">
        <b-form @submit="submit">
            <b-form-group label="Prénom:" label-for="inputFirstname">
                <b-form-input id="inputFirstName" v-model="form.firstname" type="text" required placeholder="Prénom"></b-form-input>
            </b-form-group>
            <b-form-group label="Nom" label-for="inputName">
                <b-form-input id="inputName" v-model="form.name" type="text" required placeholder="Nom"></b-form-input>
            </b-form-group>
            <b-form-group label="Email" label-for="inputEmail">
                <b-form-input id="inputEmail" v-model="form.email" type="email" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Valider</b-button>
        </b-form>
    </b-card>
</template>

<script>
export default {
    data(){
        return{
            form:{
                firstname:'',
                name:'',
                email:''
            }
        }
    }
}
</script>