<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Layanan</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Data Layanan
                        </v-btn>
                        <v-btn depressed rounded style="text-transform: none !important;" color="red accent-3"
                            @click="pdf()" class="ml-5">
                            <v-icon size="18" class="mr-2">mdi-file-pdf</v-icon>
                            Convert to PDF
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-magnify" label="Cari" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="requests" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.harga }}</td>
                                <td>{{ item.id_ukuran_hewan }}</td>
                                <td>{{ item.id_layanan }}</td>
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
                    <span class="headline">Data Layanan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="harga" v-model="form.harga" required></v-text-field>
                            </v-col>

                            <v-col col="12">
                                <v-select :items="ukuran_hewan_nama" label="Ukuran Hewan" v-model="form.id_ukuran_hewan"></v-select>
                            </v-col>

                            <v-col col="12">
                                <v-select :items="jenis_layanan_nama" label="Jenis Layanan" v-model="form.id_layanan"></v-select>
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
    data () {       
        return {         
            dialog: false,         
            keyword: '',         
            headers: [             
                {               
                    text: 'ID',               
                    value: 'id',             
                },             
                {               
                    text: 'Harga',               
                    value: 'harga'             
                },
                {               
                    text: 'ID Ukuran Hewan',               
                    value: 'id_ukuran_hewan'             
                },       
                {               
                    text: 'ID Layanan',               
                    value: 'id_layanan'             
                },                        
            ],
            requests: [],

            ukuran_hewan: [],
            ukuran_hewan_nama: [],

            jenis_layanan: [],
            jenis_layanan_nama: [],

            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',                 
                book_image : null,
            },         
            request : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '', 
            imageUrl : null,          
        }     
    },     
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/Layanan'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message;
            })
        },
        
        getUkuranHewan(){             
            var uri = this.$apiUrl + '/UkuranHewan'             
            this.$http.get(uri).then(response =>{
                this.ukuran_hewan=response.data.message;
                this.ukuran_hewan_nama=response.data.message.map(x => x.nama);
            })
        },

        getJenisLayanan(){             
            var uri = this.$apiUrl + '/JenisLayanan'             
            this.$http.get(uri).then(response =>{
                this.jenis_layanan=response.data.message;
                this.jenis_layanan_nama=response.data.message.map(x => x.nama);
            })
        },

        link(item) {
            var path = "http://backend.pawdelapan.online/upload/product/" + item.book_image;
            return path;
        },

        sendData(){
            var i;
            var jenis_layanan_selected;
            var ukuran_hewan_selected;
            for(i = 0; i < this.jenis_layanan.length; i++) {
                if (this.jenis_layanan.map(x => x.nama)[i] === this.form.id_layanan) {
                    jenis_layanan_selected = this.jenis_layanan.map(x => x.id)[i];
                }
            }

            for(i = 0; i < this.ukuran_hewan.length; i++) {
                if (this.ukuran_hewan.map(x => x.nama)[i] === this.form.id_ukuran_hewan) {
                    ukuran_hewan_selected = this.ukuran_hewan.map(x => x.id)[i];
                }
            }

            this.request.append('harga', this.form.harga);
            this.request.append('id_ukuran_hewan', ukuran_hewan_selected); 
            this.request.append('id_layanan', jenis_layanan_selected); 
            this.request.append('created_by', 'Ajeng9999');               
            var uri =this.$apiUrl + '/Layanan'             
            this.load = true             
            this.$http.post(uri,this.request).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },

        updateData(){
            var i;
            var jenis_layanan_selected;
            var ukuran_hewan_selected;
            for(i = 0; i < this.jenis_layanan.length; i++) {
                if (this.jenis_layanan.map(x => x.nama)[i] === this.form.id_layanan) {
                    jenis_layanan_selected = this.jenis_layanan.map(x => x.id)[i];
                }
            }

            for(i = 0; i < this.ukuran_hewan.length; i++) {
                if (this.ukuran_hewan.map(x => x.nama)[i] === this.form.id_ukuran_hewan) {
                    ukuran_hewan_selected = this.ukuran_hewan.map(x => x.id)[i];
                }
            }

            this.request.append('harga', this.form.harga);
            this.request.append('id_ukuran_hewan', ukuran_hewan_selected);
            this.request.append('id_layanan', jenis_layanan_selected); 
            this.request.append('id', this.updatedId);
            this.request.append('updated_by', 'Ajeng9999');
            var uri = this.$apiUrl + '/Layanan/' + this.updatedId;             
            this.load = true             
            this.$http.post(uri,this.request).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();               
                this.typeInput = 'new';           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;               
                this.typeInput = 'new';           
            })         
        },   

        editHandler(item){           
            this.typeInput = 'edit';           
            this.dialog = true;           
            this.form.harga = item.harga;      
            this.form.id_ukuran_hewan = item.id_ukuran_hewan;
            this.form.id_layanan = item.id_layanan;
            this.updatedId = item.id;
        },
        
        deleteData(deleteId){ //mengahapus data
            var uri = this.$apiUrl + '/Layanan/delete/' + deleteId; //data dihapus berdasarkan id 
            this.request.append('updated_by', 'Ajeng9999');
            this.$http.post(uri,this.request).then(response =>{                 
                this.snackbar = true;                 
                this.text = response.data.message;                 
                this.color = 'green'                 
                this.deleteDialog = false;                 
                this.getData();             
            }).catch(error =>{                 
                this.errors = error                 
                this.snackbar = true;                 
                this.text = 'Try Again';                 
                this.color = 'red'; 
            })         
        },
        
        setForm(){             
            if (this.typeInput === 'new') {               
                this.sendData()             
            } else {               
                this.updateData()             
            }         
        },   

        resetForm(){             
            this.form = {               
                harga : '',               
                id_ukuran_hewan : '',               
                id_layanan : '',                       
            }         
        },

        onFileChange() {
            let reader = new FileReader()
            reader.onload = () => {
                this.imageUrl = reader.result
            }
            reader.readAsDataURL(this.form.book_image)
        },

        pdf(){
            var uri = this.$apiUrl + '/bookpdf';
            window.open(uri);
        }
    },     
    
    mounted(){         
        this.getData();
        this.getUkuranHewan();
        this.getJenisLayanan();
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>