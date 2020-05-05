<template>
    <v-card class="mx-auto" max-width="1980">
        <v-toolbar color="#f37900" dark>
            <v-toolbar-title>MENU PENGADAAN ADMIN</v-toolbar-title>
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
        { title: 'Pemesanan Produk', src: 'https://cdn4.iconfinder.com/data/icons/reputation-management-2/66/99-512.png', flex: 2 , link: '/dashboardAdmin/pemesanan'},
         { title: 'All Product', src: 'https://cdn4.iconfinder.com/data/icons/reputation-management-2/66/99-512.png', flex: 2 , link: '/dashboardAdmin/produkPemesanan'},
         { title: 'All Layanan', src: 'https://cdn4.iconfinder.com/data/icons/reputation-management-2/66/99-512.png', flex: 2 , link: '/dashboardAdmin/listLayanan'},
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