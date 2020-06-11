<template>
    <v-container>
        <v-row>
            <v-col cols="1">
                <v-btn @click="back()">
                    <span class="black--text">Kembali</span>
                </v-btn>
            </v-col>
        </v-row>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Log Produk</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
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
                                <td>{{ item.nama }}</td>
                                <td>{{ item.keterangan }}</td>
                                <td>{{ item.Time }}</td>
                                <td>{{ item.pegawai }}</td>
                                <td class="text-center">
                                    
                                </td>
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
                    text: 'Keterangan',               
                    value: 'keterangan'             
                },       
                {               
                    text: 'Time',               
                    value: 'Time'             
                },       
                {               
                    text: 'Pegawai',               
                    value: 'pegawai'             
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
            var uri = this.$apiUrl + '/Log/Produk'             
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

        back(){
            this.$router.push({
                path: "/Admin/log"
            });
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
            var uri = this.$apiUrl + '/bookpdf';
            window.open(uri);
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