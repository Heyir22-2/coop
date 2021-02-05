<template>
    <div class="container">
        <br/>
        <h1>
            Liste des membres
        </h1>
        <template v-for="membre in $store.state.membres">
            <Membre :membre="membre"/>
        </template>
    </div>
</template>
<script>
import Membre from '@/components/Membre.vue';
export default {
    components: {Membre}
}
</script>