<template>
    <v-card class="mx-auto" max-width="1980">
        <v-container fluid>
            <v-row>
                <v-col cols="1">
                    <v-card>
                        <v-btn text @click="back()">
                            Kembali
                        </v-btn>  
                    </v-card>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                    <v-card>
                        <v-card-text>
                            <v-row>
                                <v-col cols="1"></v-col>
                                <v-col cols="10">
                                    <v-img :src="card.src" class="white--text align-end"></v-img>
                                </v-col>
                                <v-col cols="1"></v-col>
                            </v-row>
                        </v-card-text>
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
        { title: 'Member', src: 'https://png.pngtree.com/svg/20150911/yz_user_management_117401.png', flex: 4, link: '/Admin/transaksi/CS'},
        { title: 'Transaksi', src: 'https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png', flex: 4, link: '/Admin/transaksi/CS'},
        { title: 'Pembayaran', src: 'https://static.thenounproject.com/png/417261-200.png', flex: 4, link: '/Admin/pembayaran'},
        
      ],
      }
    ),

    methods:{
        action(link) {
            this.$router.push({
                path: link
            });
        },
        back(){
            this.$router.push({
                path: "/Admin/menu"
            });
        }
    }
  }
</script> 