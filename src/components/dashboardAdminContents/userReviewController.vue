<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Ukuran Hewan</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="red accent-3"
                            @click="pdf()" class="ml-5">
                            <v-icon size="18" class="mr-2">mdi-file-pdf</v-icon>
                            Convert to PDF
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
                            <tr v-for="(item,index) in items" :key="item.id_wish">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.title }}</td>
                                <td>{{ item.authors}}</td>
                                <td>{{ item.publisher }}</td>
                                <td>{{ item.category }}</td>
                                <td>{{ item.review }}</td>
                                <td>{{ item.rating }}/5</td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </v-container>
        </v-card>
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
                    text: 'Id',               
                    value: 'id',             
                },        
                {               
                    text: 'Jenis Ukuran',               
                    value: 'nama',             
                },
            ],         
            requests: [],         
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                title : '',           
                authors : '',           
                publisher : '',
                category : ''        
            },         
            request : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '',       
        }     
    },     
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/UkuranHewan'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message             
            })               
        },     
        
        pdf(){
            var uri = this.$apiUrl + '/reviewpdf';
            window.open(uri);
        }
    },     
    mounted(){         
        this.getData();     
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>