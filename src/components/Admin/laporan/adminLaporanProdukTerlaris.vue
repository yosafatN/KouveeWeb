<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Produk</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Data  Produk
                        </v-btn>
                        <v-btn depressed rounded style="text-transform: none !important;" color="red accent-3"
                            @click="pdf()" class="ml-5">
                            <v-icon size="18" class="mr-2">mdi-file-pdf</v-icon>
                            Print Produk Terlaris
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-magnify" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="requests" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.id_kategori_produk }}</td>
                                <td>{{ item.harga }}</td>
                                <td>{{ item.satuan }}</td>
                                <td>{{ item.jmlh_min }}</td>
                                <td>{{ item.jmlh }}</td>    
                                <v-img class="white--text align-end" height="70px" width="50px" :src="link(item)"></v-img>
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
                    <span class="headline">Edit Data Produk</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Nama" v-model="form.nama" required></v-text-field>
                                <v-select :items="kategori_produk_keterangan" label="Kategori Produk" v-model="form.id_kategori_produk"></v-select>
                                <v-text-field label="Harga" v-model="form.harga" required></v-text-field>
                                <v-text-field label="Satuan" v-model="form.satuan" required></v-text-field>
                                <v-text-field label="Jumlah Minimal" v-model="form.jmlh_min" required></v-text-field>
                                <v-text-field label="Jumlah" v-model="form.jmlh" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input append-icon="mdi-camera-party-mode" name="image"
                                    label="Select your image" v-model="gambar"
                                    accept="image/png, image/jpeg, image/bmp, image/jpg" height="34" >
                                </v-file-input>
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
                    text: 'Nama Produk',               
                    value: 'nama'             
                },
                {               
                    text: 'Kategori Produk',               
                    value: 'id_kategori_produk'             
                },
                {               
                    text: 'Harga',               
                    value: 'harga'             
                },
                {               
                    text: 'Satuan',               
                    value: 'satuan'             
                },
                {               
                    text: 'Jumlah Minimal',               
                    value: 'jmlh_min'             
                },
                {               
                    text: 'Jumlah',               
                    value: 'jmlh'             
                },     
                {               
                    text: 'Gambar',               
                    value: 'link_gambar'             
                },     
            ],
            requests: [],
            
            kategori_produk: [],
            kategori_produk_keterangan: [],

            gambar: null,

            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',
                id_kategori_produk : '',
                harga : '',
                satuan : '',
                jmlh_min : '',
                jmlh : '',
                link_gambar : null,
            },         
            request : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '', 
            categoryitems : ['Novel', 'Magazine', 'Comic', 'Dictionary', 'Text Books', 'Other'],  
            imageUrl : null,          
        }     
    },     
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/Produk'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message             
            })               
        },

        getKategoriProduk(){             
            var uri = this.$apiUrl + '/KategoriProduk'             
            this.$http.get(uri).then(response =>{
                this.kategori_produk=response.data.message;
                this.kategori_produk_keterangan=response.data.message.map(x => x.keterangan);
            })             
        },

        link(item) {
            var path = "http://localhost/KouveePetshop/" + item.link_gambar;
            
            return path;
        },

        sendData(){
            var i;
            var kategori_produk_selected;
            for(i = 0; i < this.kategori_produk.length; i++) {
                if (this.kategori_produk.map(x => x.keterangan)[i] === this.form.id_kategori_produk) {
                    kategori_produk_selected = this.kategori_produk.map(x => x.id)[i];
                }
            }
            
            this.request.append('nama', this.form.nama);
            this.request.append('id_kategori_produk', kategori_produk_selected);  
            this.request.append('harga', this.form.harga);
            this.request.append('satuan', this.form.satuan);
            this.request.append('jmlh_min', this.form.jmlh_min);
            this.request.append('jmlh', this.form.jmlh);
            this.request.append('link_gambar', this.gambar);  
            this.request.append('created_by', 'Ajeng9999');               
            var uri =this.$apiUrl + '/Produk'             
            this.load = true             
            this.$http.post(uri,this.request).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;
                this.gambar = null;             
                this.dialog = false;            
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
            var kategori_produk_selected;
            for(i = 0; i < this.kategori_produk.length; i++) {
                if (this.kategori_produk.map(x => x.keterangan)[i] === this.form.id_kategori_produk) {
                    kategori_produk_selected = this.kategori_produk.map(x => x.id)[i];
                }
            }

            this.request.append('nama', this.form.nama);
            this.request.append('id_kategori_produk', kategori_produk_selected);  
            this.request.append('harga', this.form.harga);
            this.request.append('satuan', this.form.satuan);
            this.request.append('jmlh_min', this.form.jmlh_min);
            this.request.append('jmlh', this.form.jmlh); 
            this.request.append('id', this.updatedId);
            this.request.append('link_gambar', this.gambar);
            this.request.append('updated_by', 'Ajeng9999');
            var uri = this.$apiUrl + '/Produk/' + this.updatedId;             
            this.load = true;
            this.$http.post(uri,this.request).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false;
                this.gambar = null;         
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
            this.form.nama = item.nama;
            this.form.id_kategori_produk = item.id_kategori_produk;
            this.form.harga = item.harga;
            this.form.satuan = item.satuan;
            this.form.jmlh_min = item.jmlh_min; 
            this.form.jmlh = item.jmlh;
            this.form.link_gambar = null; 
            this.updatedId = item.id;
        },
        
        deleteData(deleteId){ //mengahapus data
            var uri = this.$apiUrl + '/Produk/delete/' + deleteId; //data dihapus berdasarkan id 
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
                nama : '',
                id_kategori_produk : '',
                harga : '',
                satuan : '',
                jmlh_min : '',
                jmlh : '',
                link_gambar : null,            
            }         
        },

        pdf(){
            var link_nota= 'http://localhost/KouveePetShop/index.php/Laporan/ProdukTerlaris?tahun=2020';
            window.open(link_nota)
        }
    },     
    mounted(){         
        this.getData();
        this.getKategoriProduk();
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>