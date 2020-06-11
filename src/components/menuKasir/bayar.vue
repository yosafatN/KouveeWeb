<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Pembayaran</h2>
                <v-card flat>
                    <v-row>
                        <v-col cols="6" sm="3">
                            <v-btn icon color="green" @click="sendKembali()">
                                <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
                <v-row>
                    <v-col class="text-end mr-8">
                        <h2>{{ form.no_transaksi }}</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="text-end  mr-8">
                        <h2>{{ form.no_telp }}</h2>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="text-end  mr-8">
                        <h2>{{ rupiah(form.total) }}</h2>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="8" class="text-start  ml-8">
                        <v-text-field label="Diskon" v-model="form.diskon" :disabled="this.disDiskon" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="8" class="text-start  ml-8">
                        <v-text-field label="Uang yang diterima" v-model="form.bayar" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="10"></v-col>
                    <v-col cols="1" class="text-end ml-6">
                        <v-checkbox v-model="nota" :rules="[v => !!v]" label="Nota" required></v-checkbox>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="text-end mr-7 mb-3">
                        <v-btn depressed rounded style="text-transform: none !important;" color="error accent-3" @click="bayar()">
                            BAYAR
                        </v-btn>
                    </v-col>
                </v-row>

            </v-container>
        </v-card>
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
            snackbar: false,
            color: null,
            text: '',
            load: false,
            data: [],
            form: {
                no_transaksi: '',
                no_telp: '',
                total: '',
                diskon: 0,
                bayar: 0
            },
            kembalian: 0,
            id: '',
            isTransaksiLayanan: "0",
            nota: false,
            request: new FormData,
            typeInput: 'new',
            errors: '',
            updatedId: '',
            imageUrl: null,
            id: '',
            pegawai : '',
            isMember : '',
            disDiskon : true
        }
    },
    methods: {
        getTransaksi() {
            var uri = '';
            if (this.isTransaksiLayanan == "0") {
                var uri = this.$apiUrl + '/TransaksiPenjualan/'+this.id;
            }
            else {
                var uri = this.$apiUrl + '/TransaksiLayanan/cashier/'+this.id;
            }
            console.log(uri);
            
            this.$http.get(uri).then(response => {
                this.data = response.data.message;
                this.isMember = this.data.is_member;
                this.form.no_transaksi = this.data.no_transaksi;
                this.form.no_telp = this.data.no_telp;
                this.form.total = this.data.total;
                console.log(this.isMember);
                if(this.isMember == '1'){
                    this.disDiskon = false;
                }
                console.log(this.disDiskon)
            })
        },

        sendKembali() {
            this.$router.push('/Cashier')
        },

        bayar() {
            console.log(this.form.bayar + this.form.diskon - this.form.total);
            if((this.form.bayar + this.form.diskon - this.form.total) < 0){
                this.snackbar = true;
                this.text = 'Uang Tidak Cukup';
                this.color = 'red';
                this.load = false;
            }else{
                this.request.append('id_transaksi', this.id);
                this.request.append('diskon', this.form.diskon);
                this.request.append('bayar', this.form.bayar);
                this.request.append('created_by', this.pegawai);

                var uri = '';
                if (this.isTransaksiLayanan == "0") {
                    uri = this.$apiUrl + '/PembayaranPenjualan';
                }
                else {
                    uri = this.$apiUrl + '/PembayaranLayanan';
                }
                this.$http.post(uri, this.request).then(response => {     
                    this.errorType = response.data.error;
                    if (this.errorType == true) {
                            this.snackbar = true;
                            this.text = response.data.message;
                            this.color = 'red';
                            this.load = false;
                    }else{
                        if (this.nota == true) {
                            if (this.isTransaksiLayanan == "0") {
                                var link = this.$apiUrl +"/NotaProduk?no="+this.form.no_transaksi+"&diskon="+this.form.diskon;
                                window.open(link);
                                this.$router.push({
                                    path: "/Cashier"
                                });
                            }
                            else {
                                var link = this.$apiUrl +"/NotaLayanan?no="+this.form.no_transaksi+"&diskon="+this.form.diskon;
                                window.open(link);
                                this.$router.push({
                                    path: "/Cashier"
                                });
                            }
                        }
                        else{
                            this.$router.push({
                                path: "/Cashier"
                            });
                        }
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
            
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
    },
    mounted() {
        this.id = this.$session.get("id_transaksi");
        this.pegawai = this.$session.get("pegawai");
        this.isTransaksiLayanan = this.$session.get("isTransaksiLayanan");
        this.getTransaksi();
    },
}
</script>
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>