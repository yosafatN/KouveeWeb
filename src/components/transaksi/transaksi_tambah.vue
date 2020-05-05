<template>
    <v-layout row wrap align="center" justify-center="true">
        <v-flex xs6 class="my-2">
            <v-col>
                <v-btn icon color="green" @click="sendKembali()">
                    <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
                </v-btn>
            </v-col>
            <h2 row wrap align="center">Transaksi</h2>
            <v-container>
                <v-col cols="12">
                    <v-text-field label="Nomor Telepon" outlined dense v-model="form.no_telp">
                    </v-text-field>
                </v-col>
                <v-checkbox v-model="form.is_member" :rules="[v => !!v]" label="Member" required>
                </v-checkbox>

                <v-row align="center">
                    <v-col class="text-center" >
                        <v-btn depressed rounded style="text-transform: none !important;" color="soft blue"
                            @click="sendDetilLayanan()">Transaksi Layanan
                        </v-btn>
                    </v-col>
                    <v-col class="text-center" >
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="sendDetilPenjualan()">Transaksi Penjualan
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>

        </v-flex>
        <v-snackbar 
        v-model="snackbar"
        :color="color" 
        :multi-line="true" 
        :timeout="6000" 
        :top="y === 'top'"> {{ text }} 
        <v-btn dark text @click="snackbar = false"> Close </v-btn> 
        </v-snackbar> 
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            request : new FormData,  
            form: {
                no_telp: '',
                is_member: false
            },
            y: 'top'

        }
    },
    methods: {
        sendKembali() {
            this.$router.push('/transaksi');
        },

        sendDetilLayanan() {
            var cek;
            if (this.form.is_member == true) {
                cek = 1;
            }
            else {
                cek = 0;
            }
            this.request.append('no_telp', this.form.no_telp);
            this.request.append('is_member', cek);
            this.request.append('id_CS', 'Ajeng9999');
            this.request.append('created_by', 'Ajeng9999');
            var uri = this.$apiUrl + '/TransaksiLayanan';

            this.$http.post(uri, this.request).then(response => {     
                this.errorType = response.data.error;
                if (this.errorType == true) {
                        this.snackbar = true;
                        this.text = response.data.message;
                        this.color = 'red';
                        this.load = false;
                }else{
                    this.$session.set("id_transaksi", response.data.message);
                    this.$router.push({
                        path: "/transaksi/layanan"
                    });
                }
            }).catch(error => {
                console.log(error);
            })
        },

        sendDetilPenjualan() {
            var cek;
            if (this.form.is_member == true) {
                cek = 1;
            }
            else {
                cek = 0;
            }
            this.request.append('no_telp', this.form.no_telp);
            this.request.append('is_member', cek);
            this.request.append('id_CS', 'Ajeng9999');
            this.request.append('created_by', 'Ajeng9999');
            var uri = this.$apiUrl + '/TransaksiPenjualan';
            this.$http.post(uri, this.request).then(response => {     
                this.errorType = response.data.error;
                if (this.errorType == true) {
                        this.snackbar = true;
                        this.text = response.data.message;
                        this.color = 'red';
                        this.load = false;
                }else{
                    this.$session.set("id_transaksi", response.data.message);
                    this.$router.push({
                        path: "/transaksi/produk"
                    });
                }
            }).catch(error => {
                console.log(error);
            })
        },
    },
    mounted() {
        
    },
}
</script>