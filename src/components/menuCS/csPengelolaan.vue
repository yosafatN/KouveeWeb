<template>
    <v-card class="mx-auto" max-width="1980">
        <v-toolbar color="#f37900" dark>
            <v-toolbar-title>MENU PENGELOLAAN CS</v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
            <v-row dense>
                <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                    <v-card>
                        <v-img :src="card.src" class="white--text align-end"
                             height="200px" width="200px">
                        </v-img>
                        <v-card-actions>
                            <v-btn color="#f37900" dark @click="action(card.link)">{{card.title}}</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<script>
export default {    
    data: () => ({
      cards: [
        
        { title: 'Ukuran Hewan', src: 'https://cdn.onlinewebfonts.com/svg/img_533030.png', flex: 2, link: '/dashboardCs/ukuranHewan'},
        { title: 'Jenis Hewan', src: 'https://image.flaticon.com/icons/png/512/34/34872.png', flex: 2, link: '/dashboardCs/jenisHewan' },
        { title: 'Produk', src: 'https://cdn.onlinewebfonts.com/svg/img_231353.png', flex: 2 , link: '/dashboardCs/produk'},
        
        { title: 'Layanan', src: 'https://img.pngio.com/service-icon-366116-free-icons-library-services-icon-png-200_200.jpg', flex: 2, link: '/dashboardCs/layanan'},
        { title: 'Member', src: 'https://img.pngio.com/service-icon-366116-free-icons-library-services-icon-png-200_200.jpg', flex: 2, link: '/dashboardCs/member'},
        { title: 'Hewan', src: 'https://img.pngio.com/service-icon-366116-free-icons-library-services-icon-png-200_200.jpg', flex: 2, link: '/dashboardCs/hewan'},
      ],
      }
    ),

    methods:{
        action(link) {
            this.$router.push({
                path: link
            });
        }
    }
  }
</script> 