<template>
    <div class="container" v-if="conversation">
      <div class="actions">
        <button class="button button-clear" @click="editerConversation">Modifier la conversation</button>
        <button class="button button-clear" @click="chargerMessages"><big>↻</big> Recharger les messages</button>
      </div>
      <form v-if="editer" @submit.prevent="modifierConversation">
        <br>
        <fieldset>
          <label>Sujet</label>
          <input ref="topic" @keyup.esc="annulerEditer" v-model="c.topic" required type="text" placeholder="De quoi voulez-vous parler?">
          <label>Tags</label>
          <input @keyup.esc="annulerEditer" v-model="c.label" required type="text" placeholder="Quels sont les concepts?">
          <button>Modifier la conversation</button>
          <button type="button" @click="annulerEditer" class="button button-clear">Annuler</button>
        </fieldset>
      </form>
      <template v-else>
        <h1>{{c.topic}}</h1>
        <h3>{{c.label}}</h3>
      </template>
      <div v-if="messages===false">Chargement des messages...</div>
      <div v-else class="messages">
        <template v-for="message in messages">
            <Message :message="message"></Message>
        </template>
      </div>
        <div ref="bottom">
          <form class="posterMessage" @submit.prevent="posterMessage">
            <div class="row">
              <div class="column">
                <input v-model="message" required type="text" placeholder="Votre message">
              </div>
              <div class="column envoyer">
                <button>Envoyer</button>
              </div>
            </div>
          </form>
        </div>
    </div>
</template>

<script>
import Message from '@/components/Message.vue'
  export default {
    components:{Message},
    data() {
      return {
        editer:false,
        c:{topic:'', label:''},
        conversation:false,
        message:'',
        messages:false
      }
    },
    mounted(){
      if(this.$route.params.id){
        api.get('channels/'+this.$route.params.id).then(response => {
          this.conversation = response.data;
          this.clonerConversation();
          this.chargerMessages();
        })
      }
    },
    methods:{
      clonerConversation() {
        this.c.id = this.conversation.id;
        this.c.topic = this.conversation.topic;
        this.c.label = this.conversation.label;
      },
      modifierConversation() {
        api.put('channels/'+this.c.id, this.c).then(response => {
          this.conversation = response.data;
          this.clonerConversation();
          this.editer=false;
          this.$bus.$emit('charger-conversations');
        })
      },
      annulerEditer() {
        this.editer=false;
        this.clonerConversation();
      },
      editerConversation() {
        this.editer=true;
        this.clonerConversation();
        setTimeout(() => this.$refs['topic'].focus(),500);
        
      },
      chargerMessages(vider=false) {
        if(vider){
          this.messages =false;
        }
        api.get('channels/'+this.c.id+'/posts').then(response => {
          let messages = response.data.reverse();
          setTimeout(() => this.messages = messages,1000);
        })
      },
      posterMessage() {
        api.post('channels/'+this.c.id+'/posts', {
          message : this.message
        }).then(response => {
          setTimeout(() => {
            this.$refs['bottom'].scrollIntoView();
            },500);
          this.chargerMessages();
          this.message = '';
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .actions{
    position: absolute;
    top: 0;
    right: 0;
    button {
      padding:0;
      margin: 0;
      margin-right: 1em;
    }
  }
  .messages{
    padding-bottom: 3em;
  }
  form.posterMessage{
    background: white;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    margin:0;
    .envoyer{
      width: 13em;
      button {
        width: 80%;
      }
    }
  }
</style>