<template>
    <div class="message" v-if="messagePost">
        <img class="avatar" v-if="!messagePost.conversation" :src="avatar"/>
        <section>
            <header>
                <div>
                    <b><router-link :to="{name:'Membre',params:{membre_id:membre.id}}" title="Profil">{{membre.fullname}}</router-link></b> - <time v-html="dateMessage"></time>
                </div>
                <div class="conversation" v-if="messagePost.conversation">
                    Message posté dans <b><router-link :to="{name:'Conversation',params:{id:messagePost.conversation.id}}">{{messagePost.conversation.topic}}</router-link></b>
                </div>
            </header>
            <form v-if="editer" @submit.prevent="editerMessage">
                <div class="row">
                    <div class="column">
                        <input @keyup.esc="editer=false" ref="editer" v-model="messageContent" required type="text" placeholder="Votre message"/>
                    </div>
                </div>
                <div class="row">
                    <div class="column envoyer">
                        <button class="button">Enregistrer</button>
                        <button type="button" @click="editer=false" class="button button-outline">Annuler</button>
                    </div>
                </div>
            </form>
            <div v-else class="contenu">{{messagePost.message}}</div>
        </section>
        <div class="actions" v-if="messagePost.member_id == this.$store.state.membre.id">
            <button class="button-clear" v-if="!messagePost.conversation" @click="activerEditer" >Modifier</button>
            <button class="button-clear" v-if="!messagePost.conversation" @click="supprimerMessage" >Supprimer</button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['message'],
    data(){
        return{
            messagePost: false,
            editer: false,
            messageContent:''
        }
    },
    mounted() {
        this.messagePost = this.message
    },
    methods: {
        activerEditer() {
            this.editer=true;
            this.messageContent = this.messagePost.message;
            setTimeout(() => this.$refs['editer'].focus(), 500);
        },
        editerMessage() {
            api.put(`channels/${this.messagePost.channel_id}/posts/${this.messagePost.id}`,{message:this.messageContent}).then(response => {
                this.messagePost = response.data;
                this.editer = false;
            })
        },
        supprimerMessage() {
            if(confirm('Voulez-vous supprimer ce message ?')) {
                api.delete(`channels/${this.messagePost.channel_id}/posts/${this.messagePost.id}`).then(response => {
                    this.messagePost = false;
                    this.editer = false;
                })
            }
        }
    },
    computed : {
        avatar() {
            var md5 = require('md5');
            return 'https://gravatar.com/avatar/'+md5(this.membre.email)+'?s=400&d=identicon&r=pg'
        },
        membre() {
            return this.$store.getters.getMembre(this.messagePost.member_id);
        },
        dateMessage() {
            let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let dc=new Date(this.messagePost.created_at);
            let dateMessage = 'Envoyé le '+dc.toLocaleDateString('fr-FR', options)+' à '+dc.toLocaleTimeString();
            if(this.messagePost.created_at != this.messagePost.modified_at) {
                let dm=new Date(this.messagePost.modified_at);
                dateMessage += '(<small>Modifié le '+dm.toLocaleDateString('fr-FR', options)+' à '+dm.toLocaleTimeString()+'</small>)';
            }
            return dateMessage;
        }
    }
}
</script>
<style lang="scss">
    .message{
        position: relative;
        display: flex;
        background: #f0f0f0;
        padding: 1em;
        margin: 1em 0;
        border-radius: 5px;
        color: #555;
        section{
            flex: 1;
        }
        .actions{
            position: absolute;
            top: 0;
            right: 0;
            opacity: 0;
            transition: opacity 0.2s ease;
            button {
                padding:0;
                margin: 0;
                margin-right: 1em;
            }
        }
        &:hover .actions{
            opacity: 1;
        }
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
            height: 2em;
            margin-right: 0.3em;
        }
    }
    // .contenu {
    //     margin-bottom: 1em;
    // }
    div button.button{
        margin-right: 1em;
    }
</style>