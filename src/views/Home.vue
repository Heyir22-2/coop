<template>
  <div>
    <!-- <Header/> -->
    <div class="container">
      <h1>Liste des conversations</h1>
      <CreerConversation/>
      <div class="conversations">
        <template v-for="conversation in $store.state.conversations"><Conversation :conversation="conversation"/>
        </template>
        <!-- <div v-for="conversation in $store.state.conversations">{{conversation.topic}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
// import Header from '@/components/Header.vue';
  import CreerConversation from '@/components/CreerConversation.vue';
  import Conversation from '@/components/Conversation.vue';
  
  export default {
    components: {
      CreerConversation,
      Conversation
    }
  }
</script>

<style>
  .container{
    margin-top: 2em;
  }
</style>
