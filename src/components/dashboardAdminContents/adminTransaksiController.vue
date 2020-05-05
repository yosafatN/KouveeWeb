<template>
    <v-layout row wrap align="center">
        <v-flex xs12 class="my-2">
            <v-col>
                <v-btn icon color="green" @click="sendKembali">
                    <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
                </v-btn>
            </v-col>
            <h2 row wrap align="center">Transaksi</h2>
            <v-container >
                <v-col cols="12">
                    <v-text-field label="Nomor Telepon" outlined dense v-model="form.no_telp">
                    </v-text-field>
                </v-col>
                <v-checkbox v-model="form.is_member" :rules="[v => !!v]" label="Member" required>
                </v-checkbox>
                
                <v-row >
                    <v-col>
                        <v-btn depressed rounded style="text-transform: none !important;" color="soft blue" 
                            @click="sendDetilLayanan()">Transaksi Layanan
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="sendDetilPenjualan()">Transaksi Penjualan
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>

        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            request: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                no_telp: '',
                id_member: false,
            },

            request: new FormData,
            typeInput: 'new',
            errors: '',
            updatedId: '',

        }
    },
    methods: {

        sendKembali() {
            this.$router.replace('/menu');
        },


        sendDetilLayanan() {
            var cek;
            if (this.form.id_member == false) {
                cek = 0;
            }
            else {
                cek = 1;
            }
            this.request.append('is_member', cek);
            this.request.append('no_telp', this.form.no_telp);
            this.request.append('id_CS', 'Ajeng9999');
            this.request.append('created_by', 'Ajeng9999');
            var uri = this.$apiUrl + '/TransaksiLayanan';
            this.$http.post(uri, this.request).then(response => {
                if (response.data.error == false) {
                    this.snackbar = true
                    this.color = 'green'
                    this.$session.start()
                    this.$session.set('id_transaksi', response.data.message)
                    this.$router.push('/dashboardAdmin/adminAllLayanan')
                }
                else {
                    console.log("TEST");
                }
                
            }).catch(error => {
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },

        sendDetilPenjualan() {
            this.request.append('created_by', 'Ajeng9999');
            var uri = this.$apiUrl + '/TransaksiPenjualan'
            this.load = true
            this.$http.post(uri, this.request).then(response => {
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;
                this.dialog = false
                this.getData(); //mengambil data user               
                this.resetForm();
                this.$router.push({
                    path: "/dashboardAdmin/adminAllProduk"
                });
            }).catch(error => {
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },

        resetForm() {
            this.form = {
                no_telp: '',
            }
        },
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.v-layout{
  background-color: orange;
  color: orange;
}
.v-card {
  align-content: center;
  padding: 2%;
  margin-left: 8%;
  margin-right: 8%;
  margin-top: 1%;
}

</style>
