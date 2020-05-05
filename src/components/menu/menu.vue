<template>
    <v-card class="mx-auto" max-width="1980">
        <v-toolbar color="#f37900" dark>
            <v-toolbar-title>MAIN MENU ADMIN</v-toolbar-title>
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
        { title: 'Pengelolaan Data', src: 'https://png.pngtree.com/svg/20150911/yz_user_management_117401.png', flex: 3, link: '/pengelolaan'},
        { title: 'Transaksi Test', src: 'https://static.thenounproject.com/png/417261-200.png', flex: 3, link: '/dashboardAdmin/adminTransaksiController'},
        { title: 'Pelaporan', src: 'https://cdn2.iconfinder.com/data/icons/business-management-2-11/66/161-512.png', flex: 3, link: '/pelaporan' },
        { title: 'Pengadaan', src: 'https://cdn4.iconfinder.com/data/icons/reputation-management-2/66/99-512.png', flex: 3 , link: '/pengadaan'},
        
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