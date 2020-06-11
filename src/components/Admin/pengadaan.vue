<template>
    <v-container>
        <v-card flat>
            <v-col cols="12" sm="3">
                <v-btn icon color="green"  @click="sendKembali">
                    <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
                </v-btn>
            </v-col>
        </v-card>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Pengadaan</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialogTambah()">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Data
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
                                <td>{{ item.no_PO }}</td>
                                <td>{{ item.tgl_pemesanan }}</td>
                                <td>{{ item.id_supplier }}</td>
                                <td>{{ item.status }}</td>
                                <td class="text">
                                    <v-btn v-if="item.status != 'dibatalkan'" icon color="yellow darken-2" light @click="print(item)">
                                        <v-icon>mdi-printer</v-icon>
                                    </v-btn>
                                    <v-btn v-if="item.status == 'belum tercetak' && item.status != 'dibatalkan'" icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn v-if="item.status == 'tercetak' && item.status != 'dibatalkan'" icon color="green darken-1" light @click="getDetail(item)">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="item.status == 'belum tercetak'" icon color="error" light @click="deleteData(item.id)">
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
                    <span class="headline">Input Jumlah Barang</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col v-for="(item, index) in form_items" :key="index" cols="12">
                                <h4> {{item.nama}}</h4>
                                <v-text-field label="Jumlah" v-model="item.jumlah" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="inputBarang()">Save</v-btn>
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
            tambah: false,
            menu: false,
            showPassword : false,     
            keyword: '',         
            headers: [             
                {               
                    text: 'ID',               
                    value: 'id',             
                },             
                {               
                    text: 'No PO',               
                    value: 'no_PO'             
                },  
                {               
                    text: 'Tanggal Pemesanan',               
                    value: 'tgl_pemesanan',             
                },             
                {               
                    text: 'Id Supplier',               
                    value: 'id_supplier'             
                }, 
                {               
                    text: 'Status',               
                    value: 'status'             
                },
                 
                {               
                    text: 'Aksi',               
                    value: null             
                },                                
            ],
            requests: [],

            supplier: [],
            supplier_nama: [],
            id_produk: '',
            temp: [],

            items: [],
            form_items:[],
            id_pemesanan: '',

            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {                            
                
                id_supplier : '',
              
            },         
            request : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '', 
            imageUrl : null,   
            pegawai : '',       
        }     
    },
    
    methods:{       
        sendKembali() {
            this.$router.push('/Admin/menu')
        },  
        getData(){             
            var uri = this.$apiUrl + '/Pemesanan'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message             
            })               
        },
        getDetail(item){
            this.form_items = [];
            this.id_pemesanan = item.id;
            var uri = this.$apiUrl + '/DetilPemesanan/' + this.id_pemesanan;
            this.$http.get(uri).then(response => {
                this.items = response.data.message;
            })
            console.log(this.id_pemesanan);
            for(var i = 0 ;i < this.items.length;i++){
                var uri = this.$apiUrl + '/DetilPemesanan/detail/' + this.items[i].id;
                this.$http.get(uri).then(response => {
                    this.temp = response.data.message;
                    this.id_produk = this.temp[0].id_produk;
                })
                this.temp = [{id : this.id_produk, nama : this.items[i].id_produk, jumlah : 0}]
                this.form_items = this.form_items.concat(this.temp);
                console.log(this.id_produk);
            }
            console.log(this.items.length);
            this.dialog = true;
        },
        print(item){
            var uri = this.$apiUrl + '/Pemesanan/printed/' + item.id;
            this.request.append('updated_by', this.pegawai); 
            this.$http.post(uri, this.request).then(response =>{
                if(response.data.error){           
                    this.snackbar = true;               
                    this.text = response.data.message;               
                    this.color = 'red';
                }else{
                    var link = this.$apiUrl +"/Laporan/SuratPemesanan?no="+item.no_PO;
                    window.open(link);
                    this.getData();
                }
                
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })
        },
        getSupplier(){             
            var uri = this.$apiUrl + '/Supplier'             
            this.$http.get(uri).then(response =>{
                this.supplier=response.data.message;
                this.supplier_nama=response.data.message.map(x => x.nama);
            })
        },

        dialogTambah(){
            this.$router.push('/Admin/pengadaan/tambah');
        },

        sendData(){
            var i;
            var supplier_selected;

            for(i = 0; i < this.supplier.length; i++) {
                if (this.supplier.map(x => x.nama)[i] === this.form.id_supplier) {
                    supplier_selected = this.supplier.map(x => x.id)[i];
                }
            }

             
            this.request.append('id_supplier', supplier_selected);
            this.request.append('created_by', this.pegawai);               
            var uri =this.$apiUrl + '/Pemesanan'              
            this.load = true             
            this.$http.post(uri,this.request).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();  
               ;         
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },
        
        editHandler(item){           
            this.$session.set("id_pemesanan", item.id);
            this.$router.push('/Admin/pengadaan/tambah/keranjang');
        },
        inputBarang(){
            for(var i = 0 ;i < this.form_items.length;i++){
                console.log(this.form_items[i].id);
                var uri = this.$apiUrl + '/Produk/stock/' + this.form_items[i].id;
                this.request.append('jmlh', this.form_items[i].jumlah);
                this.request.append('updated_by', this.pegawai);
                this.$http.post(uri,this.request).then(response =>{
                    if(response.data.error){                 
                        this.snackbar = true;                 
                        this.text = response.data.message;                 
                        this.color = 'red';
                    }else{
                        var uri = this.$apiUrl + '/Pemesanan/received/' + this.id_pemesanan;
                        this.request.append('updated_by', this.pegawai); 
                        this.$http.post(uri, this.request).then(response =>{
                            if(response.data.error){           
                                this.snackbar = true;               
                                this.text = response.data.message;               
                                this.color = 'red';
                            }else{
                                this.snackbar = true;               
                                this.text = 'sukses';               
                                this.color = 'green';
                                this.dialog = false;
                                this.getData();
                            }
                        }).catch(error =>{               
                            this.errors = error               
                            this.snackbar = true;               
                            this.text = 'Try Again';               
                            this.color = 'red';               
                            this.load = false;           
                        })
                    }      
                }).catch(error =>{                 
                    this.errors = error                 
                    this.snackbar = true;                 
                    this.text = 'kesalahan koneksi';                 
                    this.color = 'red'; 
                })
            }
        },
        deleteData(deleteId){ //mengahapus data
            var uri = this.$apiUrl + '/Pemesanan/cancel/' + deleteId; //data dihapus berdasarkan id 
            this.request.append('updated_by', this.pegawai);
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
                tgl_pemesanan : '',
                id_supplier : '',
                status: '',           
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
        this.pegawai = this.$session.get("pegawai");
        this.getData();     
        this.getSupplier();
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>