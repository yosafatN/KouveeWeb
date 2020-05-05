<template>
    <div class="dashboard">
        <template>
            <v-row align="center" justify="center">
                <v-img
                :src="images"
                class="grey lighten-2"
                aspect-ratio="1" max-height="800"
                max-width="1700"
                ></v-img>
            </v-row>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images : require('./homebackground.png')
        }
    },

    methods: {
        cekSession() {
            if (this.$session.exists('user_id')) {
                this.$router.push({ path: "/dashboardUser" });  
            }
        }
    },
    mounted(){ 
        this.cekSession()
    }, 
}
</script>

