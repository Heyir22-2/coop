<template>
    <div class="container" v-if="conversation">
        <h1>{{conversation.topic}}</h1>
        <h3>{{conversation.label}}</h3>
        <div class="messages">
          <template v-for="message in messages">
            <blockquote>
              {{message.message}}
            </blockquote>
          </template>
        </div>
        <div ref="bottom">
          <form @submit.prevent="posterMessage">
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
  export default {
    data() {
      return {
        conversation:false,
        message:'',
        messages:[],
      }
    },
    mounted(){
      if(this.$route.params.id){
        api.get('channels/'+this.$route.params.id).then(response => {
          this.conversation = response.data;
          this.chargerMessages();
        })
      }
    },
    methods:{
      chargerMessages() {
        api.get('channels/'+this.conversation.id+'/posts').then(response => {
          this.messages = response.data.reverse()
        })
      },
      posterMessage() {
        api.post('channels/'+this.conversation.id+'/posts', {
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
  .messages{
    padding-bottom: 3em;
  }
  form{
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