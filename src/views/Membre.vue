<template>
    <div class="container" v-if="membre">
        <div><router-link to="/membres">Membres</router-link> > {{membre.fullname}}</div>
        <img class="avatarFull" :src="avatar"/>
        <h1>{{membre.fullname}}</h1>
        <ul>
            <li>Email: {{membre.email}}</li>
            <li>Membre inscrit depuis le : {{membre.depuis}}</li>
        </ul>

        <h2>Messages</h2>
        <div v-if="loading">
            Chargement des messages, veuillez patienter...
        </div>
        <template v-else v-for="message in messagesTries">
            <Message :message="message"></Message>
        </template>
    </div>
</template>
<script>
    import Message from '@/components/Message.vue'
export default {
    components: {
        Message
    },
    data() {
        return {
            membre : false,
            messages : [],
            loading : true
        }
    },
    computed: {
        avatar() {
            var md5 = require('md5');
            return 'https://gravatar.com/avatar/'+md5(this.membre.email)+'?s=400&d=identicon&r=pg'
        },
        messagesTries() {
            function compare(a, b) {
                if(a.created_at < b.created_at) {
                    return 1;
                }
                if(a.created_at > b.created_at) {
                    return -1;
                }
                return 0;
            }
            return this.messages.sort(compare).slice(0, 10);
        }
    },
    mounted() {
        if(this.$route.params.membre_id) {
            this.membre = this.$store.getters.getMembre(this.$route.params.membre_id);
            let d = new Date(this.membre.created_at);
            let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            this.membre.depuis = d.toLocaleDateString('fr-FR', options);

            let cpt=0;
            this.$store.state.conversations.forEach(conversation => {
                api.get('channels/'+conversation.id+'/posts').then(response => {
                    response.data.forEach(message => {
                        if(message.member_id == this.membre.id) {
                            message.conversation = conversation;
                            this.messages.push(message)
                        }
                    })
                    cpt++
                    if(this.$store.state.conversations.length == cpt) {
                        setTimeout(() => this.loading=false,2000);
                    }
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .avatarFull{
        float: left;
        width: 10em;
        height: 10em;
        margin-right: 0.3em;
    }
</style>