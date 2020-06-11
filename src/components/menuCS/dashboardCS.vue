<template>
    <div>
        <v-app-bar color="red">
            <v-toolbar-title 
                style="font-size: 21px;" 
                class="white--text ml-2"
                cliped-right
            > 
                Menu Costumer Service 
            </v-toolbar-title>
            <v-spacer/>
            <v-toolbar-items>
                <v-btn color="white" text @click="signOut()">
                    Logout
                </v-btn>  
            </v-toolbar-items>
        </v-app-bar>
        <VContent >
            <router-view />
        </VContent>
    </div>
</template>
<script>
    export default {
        data () {
        return {
        drawer: null,
        items: [
            
        ],
        }
    },
    methods:{
        signOut(){
            let confirm = window.confirm('Apakah anda ingin logout?')
            if(confirm){
                this.$session.clear('pegawai');
                this.$router.push('/pegawai');
            }
        }
    },
    mounted() {
        // this.$router.push({
        //     path: "/Admin/menu"
        // });
    }
}
</script>

<style lang="scss" scoped>

</style>