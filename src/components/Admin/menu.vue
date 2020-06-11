<template>
    <v-card class="mx-auto" max-width="1980">
        <v-container fluid>
            <v-row dense>
                <v-col cols="12" class="">
                    <v-btn large icon color="red" @click="getDataHabis()" :disabled="notif">
                        <v-icon>mdi-bell-alert</v-icon>
                    </v-btn>
                </v-col>
                <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                    <v-card >
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
        <v-dialog v-model="dialog" max-width="600px">
            <v-card>
                <v-card-title>Barang Yang Hampir Habis : </v-card-title>
                <v-spacer/>
                <v-card-text>
                    <v-row>
                        <v-col v-for="(item,index) in barangHabis" :key="index" cols="12">
                            <h4>{{item.nama}}</h4>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-card>
</template>
<script>
export default {    
    data: () => ({
        cards: [
            { title: 'Pengelolaan Data', src: 'https://png.pngtree.com/svg/20150911/yz_user_management_117401.png', flex: 3, link: '/Admin/pengelolaan'},
            { title: 'Transaksi', src: 'https://static.thenounproject.com/png/417261-200.png', flex: 3, link: '/Admin/transaksi'},
            { title: 'Pelaporan', src: 'https://cdn2.iconfinder.com/data/icons/business-management-2-11/66/161-512.png', flex: 3, link: '/Admin/pelaporan' },
            { title: 'Pengadaan', src: 'https://cdn4.iconfinder.com/data/icons/reputation-management-2/66/99-512.png', flex: 3 , link: '/Admin/pengadaan'},
            { title: 'Log', src: 'https://image.flaticon.com/icons/png/512/126/126472.png', flex: 3 , link: '/Admin/log'},
            
        ],
        notif : true,
        jumlahHabis : 0,
        barangHabis : [],
        dialog : false,
      }
    ),

    methods:{
        action(link) {
            this.$router.push({
                path: link
            });
        },
        checkNotif(){
            var uri = this.$apiUrl + '/Produk/produkHabis'
            this.$http.get(uri).then(response => {
                this.jumlahHabis = response.data.message;
                if(this.jumlahHabis > 0){
                    this.notif = false;
                }
            })
        },
        getDataHabis(){
            var uri = this.$apiUrl + '/Produk/produkHabisNama'
            this.$http.get(uri).then(response => {
                this.barangHabis = response.data.message;
                this.dialog = true;
            })
        }
    },
    mounted(){
        this.checkNotif();
    }
  }
</script> 