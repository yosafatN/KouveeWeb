<template>
    <v-card class="mx-auto" max-width="1980">
        <v-toolbar color="#f37900" dark>
            <v-toolbar-title>MENU PENGELOLAAN ADMIN</v-toolbar-title>
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
        { title: 'Supplier', src: 'https://png.pngtree.com/svg/20150911/yz_user_management_117401.png', flex: 2, link: 'dashboardAdmin/supplier'},
        { title: 'Ukuran Hewan', src: 'https://cdn.onlinewebfonts.com/svg/img_533030.png', flex: 2, link: '/dashboardAdmin/userUkuranHewan'},
        { title: 'Jenis Hewan', src: 'https://image.flaticon.com/icons/png/512/34/34872.png', flex: 2,  link: '/dashboardAdmin/userJenisHewan' },
        { title: 'Produk', src: 'https://cdn.onlinewebfonts.com/svg/img_231353.png', flex: 2 , link: '/dashboardAdmin/produk'},
        { title: 'Kategori Produk', src: 'https://cdn.onlinewebfonts.com/svg/img_552445.png', flex: 2, link: '/pengelolaan'},
        { title: 'Layanan', src: 'https://img.pngio.com/service-icon-366116-free-icons-library-services-icon-png-200_200.jpg', flex: 2, link: '/dashboardAdmin/layanan'},
        { title: 'Role Pegawai', src: 'https://thumbs.dreamstime.com/b/people-group-vector-icon-isolated-white-background-people-group-vector-icon-isolated-white-background-png-130270707.jpg', flex: 2, link: '/dashboardAdmin/rolePegawai' },
        { title: 'Pegawai', src: 'https://img.icons8.com/carbon-copy/2x/employee-card.png', flex: 2 , link: '/dashboardAdmin/pegawai'},
        { title: 'Transaksi Produk', src: 'https://cdn3.iconfinder.com/data/icons/e-commerce-trading/512/transaction_A-512.png', flex: 2, link: '/pengelolaan'},
        { title: 'Transaksi Layanan', src: 'https://static.thenounproject.com/png/417261-200.png', flex: 2, link: '/transaksi'},
        { title: 'Member', src: 'https://www.pngitem.com/pimgs/m/75-757250_member-vip-new-member-icon-png-transparent-png.png', flex: 2, link: '/dashboardAdmin/member' },
        { title: 'Jenis Layanan', src: 'https://cdn4.iconfinder.com/data/icons/reputation-management-2/66/99-512.png', flex: 2 , link: '/dashboardAdmin/jenisLayanan'},
        { title: 'Hewan', src: 'https://cdn4.iconfinder.com/data/icons/reputation-management-2/66/99-512.png', flex: 2 , link: '/dashboardAdmin/hewan'},
        { title: 'Transaksi', src: 'https://cdn4.iconfinder.com/data/icons/reputation-management-2/66/99-512.png', flex: 2 , link: '/dashboardAdmin/adminPengelolaanTransaksi'},
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