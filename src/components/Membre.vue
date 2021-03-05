<template>
    <div class="row">
        <img class="avatar" :src="avatar"/>
        <div class="column column-75"><h3>{{membre.fullname}}</h3> <a :href="'mailto:'+membre.email">{{membre.email}}</a></div>
        <div class="column">
            <router-link :to="{name:'Membre',params:{membre_id:membre.id}}" class="button" title="Profil">Profil</router-link>
            &nbsp;
            <button :disabled="membreConnecte" class="button button-outline" @click="effacerMembre" title="Effacer">X</button>
        </div>
    </div>
</template>
<script>
export default {
    props : ['membre'],
    computed : {
        avatar() {
            var md5 = require('md5');
            return 'https://gravatar.com/avatar/'+md5(this.membre.email)+'?s=400&d=identicon&r=pg'
        },
        membreConnecte(){
            return this.$store.state.membre.id == this.membre.id
        }
    },
    methods : {
        effacerMembre() {
            if(confirm('Voulez-vous supprimer le membre '+this.membre.fullname+' ?')) {
                api.delete('members/'+this.membre.id).then(response => {
                    this.$bus.$emit('charger-membres');
                }).catch(error => {
                    console.log(error.response.data);
                });
            }
        }
    }
}
</script>
<style scoped lang="scss">
    .row {
        .avatar{
            float: left;
            width: 5em;
            height: 5em;
            margin-right: 0.3em;
        }
        .column {
            h3 {
                margin: 0;
            }
            border-bottom: 1em;
        }
        margin-bottom: 1em;
    }
</style>