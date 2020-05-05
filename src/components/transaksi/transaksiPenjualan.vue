<template>
    <v-container grid-list-md mb-0>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Transaksi</h2>
                <v-card flat>
                    <v-row>
                        <v-col cols="6" sm="3">
                            <v-btn icon color="green" @click="sendKembali()">
                                <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col class="text-end">
                            <v-btn icon color="blue" @click="keranjang()">
                                <v-icon>mdi-cart-outline</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>

                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="tambah()">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Data
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-magnify" label="Cari" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-row>
                    <v-col v-for="(item, index) in produks" :key="index" cols="12" sm="6" md="4" lg="3">
                        <v-card class="mx-auto" max-width="400" @click="pilih(item)">
                            <v-img class="white--text align-end" height="200px"
                                :src="item.link_gambar">
                            </v-img>

                            <v-card-title class="subheading font-weight-bold">{{item.nama}}</v-card-title>

                            <v-list-item>
                                <v-list-item-content>Harga:</v-list-item-content>
                                <v-list-item-content class="align-end">{{ rupiah(item.harga) }}</v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-img class="white--text align-end" height="400px"
                                :src="form.link_gambar">
                            </v-img>

                            <v-text-field label="Jumlah" v-model="form.jumlah" required></v-text-field>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="tambahDetail()">Tambah</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            keyword: '',
            request : new FormData,
            produks: [],
            id_transaksi: '',
            form: {
                nama: '',
                harga: '',
                link_gambar: '',
                jumlah: 0,
                id_produk: 0
            }
        }
    },
    methods: {
        getProduk() {
            var uri = this.$apiUrl + '/Produk'
            this.$http.get(uri).then(response => {
                this.produks = response.data.message;
            })
        },

        sendKembali() {
            this.$router.push('/transaksi')
        },

        tambah() {
            this.$router.push('/transaksi/tambah')
        },

        keranjang() {
            this.$router.push('/transaksi/produk/keranjang')
        },

        tambahDetail() {
            this.request.append('id_produk', this.form.id_produk);
            this.request.append('id_transaksi', this.id_transaksi);
            this.request.append('harga', this.form.harga);
            this.request.append('jumlah', this.form.jumlah);
            this.request.append('pegawai', 'Ajeng9999');
            this.request.append('created_by', 'Ajeng9999');
            var uri = this.$apiUrl + '/DetilTransaksiPenjualan';
            this.$http.post(uri, this.request).then(response => {              
                this.dialog = false;
                this.resetForm();
                console.log(response.data.message);
            }).catch(error => {
                console.log(error);
                this.dialog = false;
                this.resetForm();
            })
        },

        rupiah(harga) {
            var prefix = 'Rp. ';
            var separator = '';
            var uang = (Math.round(harga * 100) / 100).toFixed(0);
            var number_string = uang.replace(/[^,\d]/g, '').toString(),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    
            if(ribuan){
                separator = sisa ? '.' : '';
                rupiah += separator + ribuan.join('.');
            }
        
            rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
            return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
        },

        pilih(item) {
            this.dialog = true;
            this.form.link_gambar = item.link_gambar;
            this.form.harga = item.harga;
            this.form.id_produk = item.id;
            
        },
        fixURL(url) {
            var link = "http://localhost/" + url.substring(22);
            if (url != null) {
                console.log(link);
                return link;
            }
            return null;
        },

        resetForm() {
            this.form.link_gambar = '';
            this.form.harga = '';
            this.form.id_produk = 0;
            this.form.nama= '';
            this.form.jumlah =  0;
        }
    },
    mounted() {
        this.getProduk();
        this.id_transaksi = this.$session.get("id_transaksi");
    },
}
</script>
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>