<template>
    <v-layout row wrap align="center" justify-center="true">
        <v-flex xs6 class="my-2">
            <v-col>
                <v-btn icon color="green" @click="sendKembali()">
                    <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
                </v-btn>
            </v-col>
            <h2 row wrap align="center">Pengadaan</h2>
            <v-container>
                <v-col cols="12">
                    <v-select :items="suppliers_nama" label="Supplier" v-model="form.id_supplier"></v-select>
                </v-col>

                <v-row align="center">
                    <v-col class="text-center" >
                        <v-btn depressed rounded style="text-transform: none !important;" color="soft blue"
                            @click="sendPemesanan()">Selesai
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
                id_supplier: ''
            },
            suppliers : [],
            suppliers_nama : [],
            seleceted_id_supplier : '',
            y: 'top',
            snackbar : false,
            text: '',
            color : '',
            pegawai: '',
        }
    },
    methods: {
        sendKembali() {
            this.$router.push('/Admin/pengadaan');
        },

        sendPemesanan() {
            for(var i = 0; i < this.suppliers.length; i++) {
                if (this.suppliers.map(x => x.nama)[i] === this.form.id_supplier) {
                    this.seleceted_id_supplier = this.suppliers.map(x => x.id)[i];
                }
            }
            this.request.append('id_supplier', this.seleceted_id_supplier);
            this.request.append('created_by', this.pegawai);
            var uri = this.$apiUrl + '/Pemesanan';
            
            this.$http.post(uri, this.request).then(response => {     
                this.errorType = response.data.error;
                if (this.errorType == true) {
                        this.snackbar = true;
                        this.text = response.data.message;
                        this.color = 'red';
                }else{
                    this.$session.set("id_pemesanan", response.data.message);
                    this.$router.push({
                        path: "/Admin/pengadaan/tambah/produk"
                    });
                }
            }).catch(error => {
                console.log(error);
            })
        },
        getSupplier(){             
            var uri = this.$apiUrl + '/Supplier'             
            this.$http.get(uri).then(response =>{
                this.suppliers=response.data.message;
                this.suppliers_nama=response.data.message.map(x => x.nama);
            })             
        },
    },
    mounted() {
        this.pegawai = this.$session.get("pegawai");
        this.getSupplier();
    },
}
</script>