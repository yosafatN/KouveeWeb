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
                            <v-btn icon color="red" @click="tambah()">
                                <v-icon>mdi-plus-circle-outline</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
                <v-layout row wrap style="margin:10px">
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
                            <v-list-item>
                                <v-list-item-content>Jumlah:</v-list-item-content>
                                <v-list-item-content class="align-end">{{ item.jumlah }}</v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title class="subheading font-weight-bold" >
                    <v-col cols="10">
                        {{form.nama}}
                    </v-col>
                    <v-col cols="2">
                         <v-btn color="blue" icon @click="dialog = false">
                            <v-icon>mdi-close-circle-outline</v-icon>
                        </v-btn> 
                    </v-col>
                </v-card-title>
                <v-img v-if="form.link_gambar !== null" class="white--text align-end" height="400px" :src="form.link_gambar"></v-img>
                <v-card-text>
                        <v-text-field label="Jumlah" v-model="form.jumlah" required></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="batal()">Batal</v-btn>
                    <v-btn color="green" text @click="selesai()">Selesai</v-btn>
                </v-card-actions>
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
                id: '',
                nama: '',
                harga: '',
                link_gambar: '',
                jumlah: 0,
                id_produk: 0
            },
            pegawai: '',
        }
    },
    methods: {
        getProduk() {
            var uri = this.$apiUrl + '/DetilTransaksiPenjualan/' + this.id_transaksi;
            this.$http.get(uri).then(response => {
                this.produks = response.data.message;
            })
        },

        sendKembali() {
            this.$router.push('/CS/transaksi')
        },

        tambah() {
            this.$router.push('/CS/transaksi/produk')
        },

        selesai() {
            if (this.form.jumlah == 0) {
                this.batal();
            }
            else {
                this.tambahDetail();
            }
        },

        batal() {
            this.request.append('updated_by', this.pegawai);
            var uri = this.$apiUrl + '/DetilTransaksiPenjualan/delete/'+this.form.id;
            this.$http.post(uri, this.request).then(response => {              
                this.getProduk();
                console.log(response.data.message);
                this.dialog = false;
            }).catch(error => {
                console.log(error);
                this.dialog = false;
            })
        },

        tambahDetail() {
            this.request.append('id_produk', this.form.id_produk);
            this.request.append('id_transaksi', this.id_transaksi);
            this.request.append('harga', this.form.harga);
            this.request.append('jumlah', this.form.jumlah);
            this.request.append('pegawai', this.pegawai);
            var uri = this.$apiUrl + '/DetilTransaksiPenjualan/'+this.form.id;
            this.$http.post(uri, this.request).then(response => {              
                this.getProduk();
                console.log(response.data.message);
                this.dialog = false;
            }).catch(error => {
                console.log(error);
                this.dialog = false;
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
            this.form.nama = item.nama;
            this.form.link_gambar = item.link_gambar;
            this.form.harga = item.harga;
            this.form.id_produk = item.id_produk;
            this.form.jumlah = item.jumlah;
            this.form.id = item.id;
            this.dialog = true;
        },
        fixURL(url) {
            var link = "http://localhost/" + url.substring(22);
            if (url != null) {
                return link;
            }
            return null;
        }
    },
    mounted() {
        this.pegawai = this.$session.get("pegawai");
        this.id_transaksi = this.$session.get("id_transaksi");
        this.getProduk();
    },
}
</script>
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>