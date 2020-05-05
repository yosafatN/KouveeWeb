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
                <v-layout row wrap style="margin:10px">
                    <v-flex xs12 class="text-right">
                        <v-text-field v-model="keyword" 
                        append-icon="mdi-magnify" label="Cari" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="requests" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.no_transaksi }}</td>
                                <td>{{ item.no_telp }}</td>
                                <td>{{ item.status }}</td>
                                <td>{{ rupiah(item.total) }}</td>
                                <td class="text-center">
                                    <v-btn icon color="green" light @click="edit(item)">
                                        <v-icon>mdi-check-outline</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Transaksi Dibatalkan </span>
                </v-card-title>
                <v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Jangan</v-btn>
                        <v-btn color="error darken-1" text @click="batal()" danger>Batalkan Transaksi</v-btn>
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
            headers: [{
                    text: 'No',
                    value: 'id',
                },
                {
                    text: 'No Transaksi',
                    value: 'no_transaksi'
                },
                {
                    text: 'Nomor Telepon',
                    value: 'no_telp'
                },
                {
                    text: 'Status',
                    value: 'status'
                },
                {
                    text: 'Total',
                    value: 'total'
                },
                {
                    text: 'Aksi',
                    value: null
                },
            ],
            requests: [],

            pegawai: [],
            pegawai_nama: [],

            member: [],
            member_nama: [],

            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                no_transaksi: '',
                no_telp: '',
                total: '',
                status: '',
                url_gambar: null,
            },
            id: '',
            request: new FormData,
            typeInput: 'new',
            errors: '',
            updatedId: '',
            imageUrl: null,
            id: '',
            isTransaksiLayanan: ''
        }
    },
    methods: {
        getTransaksiLayanan() {
            var uri = this.$apiUrl + '/TransaksiPenjualan'
            this.$http.get(uri).then(response => {
                this.requests = response.data.message;
            })
            var uri = this.$apiUrl + '/TransaksiLayanan/cashier'
            this.$http.get(uri).then(response => {
                this.requests = this.requests.concat(response.data.message);
            })
        },

        sendKembali() {
            this.$router.push('/menu')
        },

        edit(item){
            this.$session.set("id_transaksi", item.id);
            if (item.isTransaksiLayanan == "0") {
                this.$router.push('/pembayaran/produk/');
            }
            else if (item.isTransaksiLayanan == "1") {
                this.$router.push('/pembayaran/layanan/');
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
        this.getTransaksiLayanan();
    },
}
</script>
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>