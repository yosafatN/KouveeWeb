<template>
    <v-card class="mx-auto" max-width="1980">
        <v-container fluid>
            <v-row>
                <v-col cols="1">
                    <v-card>
                        <v-btn text @click="back()">
                            Kembali
                        </v-btn>  
                    </v-card>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                    <v-card>
                        <v-img :src="card.src" class="white--text align-end"
                             height="200px" width="200px">
                        </v-img>
                        <v-card-actions>
                            <v-btn color="#f37900" dark @click="action(card.link)">{{card.title}}</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="dialog_tahun" persistent max-width="600px">
            <v-card>
                <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                    <v-overflow-btn class="my-2" v-model="date" return-object="" :items="dropdown_year" label="Tahun" target="tahun"></v-overflow-btn>
                            </v-col>
                        </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog_tahun = false">Tutup</v-btn>
                    <v-btn color="blue darken-1" text @click="pdfTahunan()">Pilih</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog_bulan" persistent max-width="600px">
            <v-card>
                <v-card-text>
                       <v-row>
                           <v-col cols="12"> 
                               <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date"
                                        label="Bulan"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" @input="menu2 = false" type="month"></v-date-picker>
                                </v-menu>
                           </v-col>
                       </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog_bulan = false">Tutup</v-btn>
                    <v-btn color="blue darken-1" text @click="pdfBulanan()">Pilih</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>
<script>
export default {    
    data: () => ({
        cards: [
            { title: 'Produk Terlaris', src: 'https://cdn4.iconfinder.com/data/icons/supply-of-services-glyph/64/medal_best_service_care_quality_business-512.png', flex: 3 , link: '1'},
            { title: 'Layanan Terlaris', src: 'https://cdn4.iconfinder.com/data/icons/supply-of-services-line/64/medal_best_service_care_quality_business-512.png', flex: 3 , link: '2'},
            { title: 'Pendapatan Bulanan', src: 'https://previews.123rf.com/images/creativepriyanka/creativepriyanka1908/creativepriyanka190800031/128324870-icon-for-revenue-income.jpg', flex: 3 , link: '3'},
            { title: 'Pendapatan Tahunan', src: 'https://cdn.onlinewebfonts.com/svg/img_327993.png', flex: 3 , link: '4'},
            { title: 'Pengadaan Bulanan', src: 'https://cdn.onlinewebfonts.com/svg/img_382150.png', flex: 3 , link: '5'},
            { title: 'Pengadaan Tahunan', src: 'https://www.pngkey.com/png/detail/329-3296877_1-year-frozen-shelf-life-time-management-icon.png', flex: 3 , link: '6'},      
            ],
        dialog_tahun : false,
        date: '',
        dialog_bulan: false,
        dropdown_year: [],
        data: ''
      }
    ),
    methods:{
        years () {
            const year = new Date().getFullYear();
            this.dropdown_year =  Array.from({length: year - 2000}, (value, index) =>  index + 2001);
        },
        action(link) {
           if(link == '1'){
               this.data = 'produk';
               this.dialog_tahun = true;
           }else if(link == '2'){
               this.data = 'layanan';
               this.dialog_tahun = true;
           }else if(link == '3'){
               this.data = 'pendapatan';
               this.dialog_bulan = true;
           }else if(link == '4'){
               this.data = 'pendapatan';
               this.dialog_tahun = true;
           }else if(link == '5'){
               this.data = 'pengadaan';
               this.dialog_bulan = true;
           }else if(link == '6'){
               this.data = 'pengadaan';
               this.dialog_tahun = true;
           }
        },
        back(){
            this.$router.push({
                path: "/Admin/menu"
            });
        },
        pdfTahunan(){
            if(this.data == 'produk'){
                var link = this.$apiUrl +"/Laporan/ProdukTerlaris?tahun="+this.date;
                window.open(link);
            }else if(this.data == 'layanan'){
                var link = this.$apiUrl +"/Laporan/LayananTerlaris?tahun="+this.date;
                window.open(link);
            }else if(this.data == 'pendapatan'){
                var link = this.$apiUrl +"/Laporan/PendapatanTahunan?tahun="+this.date;
                window.open(link);
            }else if(this.data == 'pengadaan'){
                var link = this.$apiUrl +"/Laporan/PengadaanProdukTahunan?tahun="+this.date;
                window.open(link);
            }
            this.date = '';
            this.data = '';
            this.dialog_tahun = false;
        },
        pdfBulanan(){
            var bulan = Number(this.date.substring(5,7));
            if(this.data == 'pendapatan'){
                var link = this.$apiUrl +"/Laporan/PendapatanBulanan?tahun="+this.date.substring(0,4)+"&bulan="+bulan;
                window.open(link);
            }else if(this.data == 'pengadaan'){
                var link = this.$apiUrl +"/Laporan/PengadaanProdukBulanan?tahun="+this.date.substring(0,4)+"&bulan="+bulan;
                window.open(link);
            }
            this.date = '';
            this.data = '';
            this.dialog_bulan = false;
        }
    },
    mounted(){
        this.years();
    }
  }
</script> 