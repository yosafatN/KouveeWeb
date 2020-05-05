<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            fixed
            temporary
         >
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Kouvee Petshop
                </v-list-item-title>
                </v-list-item-content>
                    </v-list-item>
                <v-divider></v-divider>
                    <v-list>
                        <v-list-item
                            v-for="item in items"
                            :key="item.title"
                            link 
                            @click="$router.push({name : item.name})"
                            color="white"
                        >
                <v-list-item-icon color="white">
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
 <template v-slot:append>
    <div class="pa-2">
         <v-btn id="btnLog" block @click="signOut()">Sign Out</v-btn>
            </div>
                </template>
                    </v-navigation-drawer>
                        <v-app-bar app fixed clipped-left height="80px">
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                    <VSpacer />
                    <v-toolbar-title style="font-size: 30px;" class="white--text ml-2">
                        Kouvee Petshop
                    </v-toolbar-title>
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
            let confirm = window.confirm('are you sure want to Sign Out?')
            if(confirm){
                this.$session.clear('user_id');
                this.$router.push('/');
            }else{
                this.$router.push('/dashboardAdmin')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  background-color: #f37900;
  color : #5CA2A5;
}

.v-app-bar {
    background-color: #f37900;
}

.title {
    color: white;
}

.subtitle {
    color: white;
}

#btnLog {
    background-color: #f0a152;
    color: white;
}
</style>