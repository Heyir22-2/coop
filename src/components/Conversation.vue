<template>
    <div class="row">
        <div class="column column-75"><h3>{{conversation.topic}}</h3> {{conversation.label}}
        </div>
        <div class="column column-25 actions">
            <router-link :to="{name:'Conversation', params:{id : conversation.id}}" class="button">Voir</router-link>
            <button class="button button-clear" @click="supprimerMessage">Supprimer</button>
            </div>
    </div>
</template>
<script>
export default {
    props : ['conversation'],
    // computed: {
    //     membre() {
    //         return this.$store.getters.getMembre(this.conversation.member_id);
    //     },
    // }
    methods: {
        supprimerMessage() {
            if(confirm('Voulez-vous supprimer cette conversation ?')) {
                api.delete(`channels/${this.conversation.id}`).then(response => {
                    this.$bus.$emit('charger-conversations');
                })
            }
        }
    },
}
</script>
<style scoped lang="scss">
.row {
    .column{
        h3 {
            margin: 0;
            display: inline-block;
        }
        padding-bottom: 1em;
        border-bottom: 1px solid #ccc;
    }
    margin-bottom: 1em;
    .actions {
        text-align: right;
    }
}

</style>