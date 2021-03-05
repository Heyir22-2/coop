<template>
    <div class="message">
        <img class="avatar" :src="avatar"/>
        <header>
            <div>
                <router-link :to="{name:'Membre',params:{membre_id:membre.id}}" title="Profil"><b>{{membre.fullname}}</b></router-link> <time> le {{dateMessage}}</time>
            </div>
            <div class="conversation" v-if="message.conversation">
                Message posté dans <b><router-link :to="{name:'Conversation',params:{id:message.conversation.id}}">{{message.conversation.topic}}</router-link></b>
            </div>
        </header>
        <div>{{message.message}}</div>
    </div>
</template>
<script>
export default {
    props: ['message'],
    computed : {
        avatar() {
            var md5 = require('md5');
            return 'https://gravatar.com/avatar/'+md5(this.membre.email)+'?s=400&d=identicon&r=pg'
        },
        membre() {
            return this.$store.getters.getMembre(this.message.member_id);
        },
        dateMessage() {
            let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(this.message.created_at).toLocaleDateString('fr-FR', options);
        }
    }
}
</script>
<style lang="scss" scoped>
    .message{
        background: #f0f0f0;
        padding: 1em;
        margin: 1em 0;
        border-radius: 5px;
        color: #555;
        header{
            font-size: 90%;
            border-bottom: 1px solid white;
            padding-bottom: .5em;
            margin-bottom: .5em;
            display: flex;
            div:not(.conversation){
                flex: 1;
            }
            time{
                font-size: 90%;
            }
            
        }
        .avatar{
            float: left;
            width: 2em;
            margin-right: 0.3em;
        }
    }
</style>