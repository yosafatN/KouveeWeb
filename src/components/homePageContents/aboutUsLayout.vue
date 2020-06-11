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
        <v-card-text align="right">
          Copyright P3L Kelompok 2 F, (Rafael Claudio), (Angela Ajeng)
        </v-card-text>
      </v-card>
      </v-flex>
    
  </v-layout>
  
</template>

<script>
  export default {
    data() {
        return {
            images : require('./tentangkami.png')
        }
    },
    
    methods: {
        cekSession() {
            if (this.$session.exists('user_id')) {
                this.$router.push({ path: "/" });  
            }
        }
    },
    mounted(){ 
        this.cekSession()
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
