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
                                :src="item.url_gambar">
                            </v-img>
                            <v-card-title class="subheading font-weight-bold">{{item.id_layanan}} {{item.id_ukuran_hewan}}</v-card-title>

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
                <v-card-title>{{form.nama_layanan}}</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-img class="white--text align-end" height="400px"
                                    :src="form.link_gambar">
                                </v-img>
                            </v-col>
                        </v-row>
                        <v-row>
                            <h2>Data Hewan</h2>
                        </v-row>
                        <v-row>
                            <v-text-field label="Nama Hewan" v-model="form.nama_hewan" required></v-text-field>
                        </v-row>
                        <v-row>
                            <v-select :items="jenis_hewan_nama" label="Jenis Hewan" v-model="form.id_jenis_hewan"></v-select>
                        </v-row>
                        <v-row>
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="form.tanggal_lahir" transition="scale-transition" offset-y min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="form.tanggal_lahir" label="Tanggal Lahir" readonly v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="form.tanggal_lahir" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(form.tanggal_lahir)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
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
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
            {{ text }}
            <v-btn dark text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
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
            menu: false,
            errorType: false,
            jenis_hewan: [],
            jenis_hewan_nama: [],
            form: {
                nama_layanan: '',
                harga_layanan: '',
                link_gambar: '',
                jumlah: 1,
                nama_hewan : '',
                id_jenis_hewan : '',
                tanggal_lahir : '',
                id_layanan: 0
            },
            snackbar : false
        }
    },
    methods: {
        getLayanan() {
            var uri = this.$apiUrl + '/Layanan'
            this.$http.get(uri).then(response => {
                this.produks = response.data.message;
            })
        },

        getJenisHewan() {
            var uri = this.$apiUrl + '/JenisHewan'
            this.$http.get(uri).then(response => {
                this.jenis_hewan = response.data.message;
                this.jenis_hewan_nama = response.data.message.map(x => x.keterangan);
            })
        },

        sendKembali() {
            this.$router.push('/CS/transaksi')
        },

        tambah() {
            this.$router.push('/CS/transaksi/tambah')
        },

        keranjang() {
            this.$router.push('/CS/transaksi/layanan/keranjang')
        },

        tambahDetail() {
            for(var i = 0; i < this.jenis_hewan.length; i++) {
                if (this.jenis_hewan.map(x => x.keterangan)[i] === this.form.id_jenis_hewan) {
                    this.form.id_jenis_hewan = this.jenis_hewan.map(x => x.id)[i];
                }
            }

            this.request.append('id_layanan', this.form.id_layanan);
            this.request.append('harga', this.form.harga);
            this.request.append('nama_hewan', this.form.nama_hewan);
            this.request.append('id_jenis_hewan', this.form.id_jenis_hewan);
            this.request.append('tanggal_lahir', this.form.tanggal_lahir);
            this.request.append('id_transaksi', this.id_transaksi);
            this.request.append('jumlah', '1');
            this.request.append('pegawai', 'Ajeng9999');
            var uri = this.$apiUrl + '/DetilTransaksiLayanan';
            this.$http.post(uri, this.request).then(response => {              
                this.dialog = false;
                this.resetForm(); 
                this.errorType = response.data.error;
                if(this.errorType){
                    this.snackbar = true; //mengaktifkan snackbar               
                    this.color = 'red'; //memberi warna snackbar               
                    this.text = response.data.message; //memasukkan pesan ke snackbar               
                    this.load = false; 
                }else{
                    this.snackbar = true; //mengaktifkan snackbar               
                    this.color = 'green'; //memberi warna snackbar               
                    this.text = response.data.message; //memasukkan pesan ke snackbar               
                    this.load = false; 
                }      
            }).catch(error => {
                console.log(error);
                this.dialog = false;
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false            
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
            this.form.link_gambar = item.url_gambar;
            this.form.nama_layanan = item.id_ukuran_hewan + ' ' + item.id_layanan; 
            this.form.harga = item.harga;
            this.form.id_layanan = item.id;
            this.getJenisHewan();
        },
        fixURL(url) {
            if (url != null) {
                return "http://localhost/" + url.substring(22);
            }
            return null;
        },

        resetForm() {
            this.form.nama_layanan = '';
            this.form.harga_layanan =  '';
            this.form.link_gambar = '';
            this.form.jumlah = 1;
            this.form.nama_hewan = '';
            this.form.id_jenis_hewan = '';
            this.form.tanggal_lahir = '';
            this.form.id_layanan = 0;
        }
    },
    mounted() {
        this.getLayanan();
        this.id_transaksi = this.$session.get("id_transaksi");
    },
}
</script>
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>