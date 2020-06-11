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
                <h2 class="text-md-center">Log Transaksi Layanan</h2>
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
                                <td>{{ item.no_transaksi }}</td>
                                <td>{{ item.keterangan }}</td>
                                <td>{{ item.Time }}</td>
                                <td>{{ item.pegawai }}</td>
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
                    text: 'Nomor Transaksi',               
                    value: 'no_transaksi'             
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

            role_pegawai: [],
            role_pegawai_keterangan: [],

            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',                 
                tanggal_lahir : '',
                alamat : '',
                no_telp : '',
                id_role_pegawai : '',
                username: '',
                password: ''
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
            var uri = this.$apiUrl + '/Log/transaksiLayanan'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message             
            })               
        },

        back(){
            this.$router.push({
                path: "/Admin/log"
            });
        }, 
    },     
    mounted(){         
        this.getData();     
        this.getRolePegawai();
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>