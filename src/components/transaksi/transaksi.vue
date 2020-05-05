<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Transaksi</h2>
                <v-card flat>
                    <v-col cols="12" sm="3">
                        <v-btn icon color="green"  @click="sendKembali">
                            <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
                        </v-btn>
                    </v-col>
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
                                <td>{{ item.total }}</td>
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteData(item.id)">
                                        <v-icon>mdi-delete</v-icon>
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
                    <span class="headline">Edit Transaksi </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="no_transaksi" v-model="form.no_transaksi" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="no_telp" v-model="form.no_telp" required></v-text-field>
                            </v-col>
                        </v-row>
                        <small>*indicates required field</small>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
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
                    text: 'ID',
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
            request: new FormData,
            typeInput: 'new',
            errors: '',
            updatedId: '',
            imageUrl: null,
        }
    },
    methods: {
        getTransaksiLayanan() {
            var uri = this.$apiUrl + '/TransaksiPenjualan'
            this.$http.get(uri).then(response => {
                this.requests = response.data.message;
            })
            var uri = this.$apiUrl + '/TransaksiLayanan/cs'
            this.$http.get(uri).then(response => {
                this.requests = this.requests.concat(response.data.message);
            })
        },

        sendKembali() {
            this.$router.push('/menu')
        },

        tambah() {
            this.$router.push('/transaksi/tambah')
        }
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