<template>
    <div class="container">
        <h1>Créer un compte</h1>
        <form @submit.prevent="creerCompte">
        <div>
            <label>Nom et prénom</label>
            <input v-model="fullname" required type="text" placeholder="Nom">
        </div>
        <div>
            <label>Mail</label>
            <input v-model="email" required type="email" placeholder="Mail">
        </div>
        <div>
            <label>Mot de passe</label>
            <input v-model="password" required type="password" placeholder="Mot de passe">
        </div>
        <div>
            <label>Vérifier le mot de passe</label>
            <input v-model="password2" required type="password" placeholder="Vérifier">
        </div>
        <div>
            <button class="button">Créer mon compte</button>
        </div>
        </form>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                fullname : '',
                email :'',
                password: '',
                password2: '',
            }
        },
        methods :
        {
            creerCompte()
            {
                if(this.password == this.password2){
                    api.post('members',
                    {
                        fullname:this.fullname,
                        email:this.email,
                        password:this.password
                    }).then(response=>
                    {
                        alert('Votre compte a été crée vous pouvez vous connecter a Coop');
                        console.log(response.data); //contenu des data
                        this.$router.push('/se-connecter');
                    }).catch(error=>
                    {
                        alert(error.response.data.message); //Contenu de de l'erreur
                    })
                }else{
                    alert("Erreur, Mots de passe différents.");
                }
            }
        }
    }
</script>