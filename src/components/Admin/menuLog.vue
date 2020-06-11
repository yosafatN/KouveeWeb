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
        { title: 'Log Supplier', src: 'https://png.pngtree.com/svg/20150911/yz_user_management_117401.png', flex: 2, link: '/Admin/log/supplier'},
        { title: 'Log Ukuran Hewan', src: 'https://cdn.onlinewebfonts.com/svg/img_533030.png', flex: 2, link: '/Admin/log/ukuranHewan'},
        { title: 'Log Jenis Hewan', src: 'https://image.flaticon.com/icons/png/512/34/34872.png', flex: 2,  link: '/Admin/log/jenisHewan' },
        { title: 'Log Kategori Produk', src: 'https://cdn.onlinewebfonts.com/svg/img_552445.png', flex: 2, link: '/Admin/log/kategoriProduk'},
        { title: 'Log Produk', src: 'https://cdn.onlinewebfonts.com/svg/img_231353.png', flex: 2 , link: '/Admin/log/produk'},
        { title: 'Log Jenis Layanan', src: 'https://cdn4.iconfinder.com/data/icons/reputation-management-2/66/99-512.png', flex: 2 , link: '/Admin/log/jenisLayanan'},
        { title: 'Log Layanan', src: 'https://img.pngio.com/service-icon-366116-free-icons-library-services-icon-png-200_200.jpg', flex: 2, link: '/Admin/log/layanan'},
        { title: 'Log Role Pegawai', src: 'https://thumbs.dreamstime.com/b/people-group-vector-icon-isolated-white-background-people-group-vector-icon-isolated-white-background-png-130270707.jpg', flex: 2, link: '/Admin/log/rolePegawai' },
        { title: 'Log Pegawai', src: 'https://img.icons8.com/carbon-copy/2x/employee-card.png', flex: 2 , link: '/Admin/log/pegawai'},
        { title: 'Log Transaksi Produk', src: 'https://cdn3.iconfinder.com/data/icons/e-commerce-trading/512/transaction_A-512.png', flex: 2, link: '/Admin/log/transaksiProduk'},
        { title: 'Log Transaksi Layanan', src: 'https://static.thenounproject.com/png/417261-200.png', flex: 2, link: '/Admin/log/transaksiLayanan'},
        { title: 'Log Member', src: 'https://www.pngitem.com/pimgs/m/75-757250_member-vip-new-member-icon-png-transparent-png.png', flex: 2, link: '/Admin/log/member' },
        { title: 'Log Hewan', src: 'https://www.freeiconspng.com/uploads/animal-paw-vector-icon-animals-icons-icons-download-0.png', flex: 2 , link: '/Admin/log/hewan'}
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