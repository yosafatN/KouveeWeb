<template>
  <v-app>
    <v-app-bar app color="#f37900" class="white--text" height="75">
      <v-toolbar-title class="font-weight-medium display-1">
        <span class="ml-5">Kouvee Petshop</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-toolbar-items>
        <v-btn text router to="/pegawai">Home</v-btn>
      </v-toolbar-items>

      <v-toolbar-items>
        <v-btn text router to="/pegawai/signDual">Admin</v-btn>
      </v-toolbar-items>

      <v-toolbar-items>
        <v-btn text router to="/pegawai/loginCs">Customer Service</v-btn>
      </v-toolbar-items>

      <v-toolbar-items>
        <v-btn text router to="/pegawai/loginKasir">Kasir</v-btn>
      </v-toolbar-items>

      <v-toolbar-items>
        <v-btn text router to="/">Halaman Customer </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<style lang="scss" scoped>
.v-btn {
  color: white;
}
</style>

<script>
export default {
 name: 'app'
}
</script>