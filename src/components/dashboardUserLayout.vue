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
                    getTheBook
                </v-list-item-title>
                <v-list-item-title class="subtitle" color="white">
                    Number 1 in Country
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
                        getTheBook
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
            { title: 'Borrow Book', icon: 'mdi-book-open-page-variant', name: 'borrowBookController'},
            { title: 'Wish List', icon: 'mdi-playlist-star', name: 'requestBookController'},
            { title: 'Borrow List', icon: 'mdi-notebook-multiple', name: 'borrowListController'},
            { title: 'Book Review', icon: 'mdi-comment-multiple', name: 'reviewController'},
            { title: 'My Account', icon: 'mdi-account', name: 'accountController'},
        ],
        }
    },
    methods:{
        signOut(){
            let confirm = window.confirm('are you sure to want to Sign Out?')
            if(confirm){
                this.$session.clear('user_id');
                this.$router.push('/');
            }else{
                this.$router.push('/dashboardUser')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  background-color: #3CBCD4;
  color : #5CA2A5;
}

.v-app-bar {
    background-color: #3CBCD4;
}

.title {
    color: white;
}

.subtitle {
    color: white;
}

#btnLog {
    background-color: #055C75;
    color: white;
}
</style>