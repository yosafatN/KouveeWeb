<template>
<v-layout row wrap align="center">
    <v-flex xs12 class="my-2">
      <v-card height="100%">
        <v-img :src="images" height="170px" width="140px"></v-img>

        <h2 row wrap align="center" >Kouvee Petshop</h2>
        <v-card-text align="justify">
           Kouvee Petshop merupakan petshop yang berdiri sejak tahun 2018. Mempunyai visi dalam memberikan 
           Pelayanan Terbaik bagi setiap kebutuhan 
        </v-card-text>
        <v-card-text align="justify">
           Alamat : Jalan Moses Gatotkaca No.22 Yogyakarta
        </v-card-text>
        <v-card-text align="justify">
           Telepon : (0274) 357735
        </v-card-text>
        <v-container>
      <h2 class="text-center">Struktur Organisasi</h2>
      <v-row>
        <v-col v-for="item in grid" :key="item.id" class="d-flex child-flex" cols="6" sm="4">
          <v-card flat tile class="d-flex">
            <v-img :src="item.src" aspect-ratio="1" class="grey lighten-2">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
      </v-card>
      </v-flex>
      
      
  
  </v-layout>
 
</template>

<script>
  export default {
    data() {
        return {
            images : require('./tentangkami.png'),
            grid: [
        {
          id: 1,
          src: require('./pegawai1.jpg')
        },
        {
          id: 2,
          src: require('./pegawai2.jpg')
        },
        {
          id: 3,
          src: require('./pegawai3.jpg')
        },
        {
          id: 4,
            src: require('./pegawai4.jpg')
        },
        {
          id: 5,
          src: require('./pegawai5.jpg')
        },
      ]
        }
    },
    
    methods: {
    },
    mounted(){ 
    }, 
}
</script>

<style lang="scss" scoped>
.v-card {
  align-content: center;
  padding: 2%;
  margin-left: 8%;
  margin-right: 8%;
  margin-top: 1%;
}

</style>
