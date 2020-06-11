<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <v-card flat>
                    <v-col cols="12" sm="3">
                        <v-btn icon color="green"  @click="sendKembali">
                            <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
                        </v-btn>
                    </v-col>
                </v-card>
                <h2 class="text-md-center">Transaksi Penjualan</h2>

                <v-data-table :headers="headers" :items="requests" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.no_transaksi }}</td>
                                <td>{{ item.no_telp }}</td>
                                <td>{{ item.status }}</td>
                                <td>{{ rupiah(item.total) }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </v-container>
        </v-card>
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
                }
            ],
            requests: [],
        }
    },
    methods: {
        getTransaksiLayanan() {
            var uri = this.$apiUrl + '/TransaksiPenjualan/admin'
            this.$http.get(uri).then(response => {
                this.requests = response.data.message;
            })
        },

        sendKembali() {
            this.$router.push('/Admin/pengelolaan')
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