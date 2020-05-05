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
                            @click="sendKonfirmasi
                            ">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Data
                        </v-btn>
                        <v-btn depressed rounded style="text-transform: none !important;" color="red accent-3"
                            @click="pdf()" class="ml-5">
                            <v-icon size="18" class="mr-2">mdi-file-pdf</v-icon>
                            Convert to PDF
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
                no_transaksi : '', 
                no_telp : '',
                total : '',
                status : '',                              
                url_gambar : null,
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
            var uri = this.$apiUrl + '/TransaksiLayanan/cs'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message;
            })
        },

        getTransaksiPenjualan(){             
            var uri = this.$apiUrl + '/TransaksiPenjualan'             
            this.$http.get(uri).then(response =>{
                this.requests = this.requests.concat(response.data.message)
            })
        },

        getPegawai(){             
            var uri = this.$apiUrl + '/Pegawai'             
            this.$http.get(uri).then(response =>{
                this.pegawai=response.data.message;
                this.pegawai_nama=response.data.message.map(x => x.nama);
            })
        },

        getMember(){             
            var uri = this.$apiUrl + '/Member'             
            this.$http.get(uri).then(response =>{
                this.member=response.data.message;
                this.member_nama
                =response.data.message.map(x => x.nama);
            })
        },

        link(item) {
            var path = item.url_gambar;
            return path;
        },

        sendData(){ 
            this.request.append('id_member', member_selected); 
            this.request.append('no_telp', this.form.no_telp);
            this.request.append('id_CS', pegawai_selected);
            this.request.append('status', this.form.status);   
            this.request.append('created_by', 'Ajeng9999');               
            var uri =this.$apiUrl + '/TransaksiLayanan'             
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
            this.request.append('no_transaksi', this.no_transaksi); 
            this.request.append('no_telp', this.form.no_telp); 
            this.request.append('id', this.updatedId);
            this.request.append('updated_by', 'Ajeng9999');
            var uri = this.$apiUrl + '/TransaksiLayanan/' + this.updatedId;             
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
            this.form.no_transaksi = item.no_transaksi;      
            this.form.no_telp = item.no_telp;
            this.form.total = item.total;      
            this.form.status = item.status;
            this.updatedId = item.id;
        },
        
        deleteData(deleteId){ //mengahapus data
            var uri = this.$apiUrl + '/TransaksiLayanan/delete/' + deleteId; //data dihapus berdasarkan id 
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

        sendKembali(){
        this.request.append('created_by', 'Ajeng9999');               
        var uri =this.$apiUrl + '/TransaksiLayanan'   
        var uri =this.$apiUrl + '/TransaksiPenjualan'          
        this.load = true             
        this.$http.post(uri,this.request).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm(); 
                this.$router.push({
                path: "/menuCS"
        });          
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },
        
        sendKonfirmasi(){
        this.request.append('no_telp', this.form.keterangan); 
        this.request.append('created_by', 'Ajeng9999');               
        var uri =this.$apiUrl + '/TransaksiLayanan'            
        this.load = true             
        this.$http.post(uri,this.request).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm(); 
                this.$router.push({
                path: "/dashboardAdmin/adminKonfirmasiTransaksi"
        });          
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
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
                no_transaksi : '',               
                no_telp : '',               
                total : '',   
                status : '',                    
            }         
        },
        
        onFileChange() {
            let reader = new FileReader()
            reader.onload = () => {
                this.imageUrl = reader.result
            }
            reader.readAsDataURL(this.form.url_gambar)
        },

        pdf(){
            var uri = this.$apiUrl + '/bookpdf';
            window.open(uri);
        }
    },     
    mounted(){         
        this.getData();
        this.getTransaksiPenjualan();
        this.getPegawai();
        this.getMember();
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
.v-navigation-drawer {
  background-color: #F37900;
  color : #F37900;
}
.v-app-bar {
    background-color: #F37900;
}

.title {
    color: white;
}

.subtitle {
    color: white;
}

#btnLog {
    background-color: rgb(118, 139, 145);
    color: white;
}
</style>