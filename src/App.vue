<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import storage from './storage'
export default {
  name: "App",
  components: {
  },
  data() {
    return {
    }
  },
  mounted() {
    if (this.$cookie.get('userId')){
      this.getUser();
      this.getCardCount();
    }
  },
  methods: {
    getUser() {
      this.axios.get('/user').then((res) => {
        this.$store.dispatch('saveUserName', res.username)
      })
    },
    getCardCount() {
      this.axios.get('/carts/products/sum').then((res) => {
        this.$store.dispatch('saveCartCount', res)
      })
    }
  }
};
</script>

<style lang="scss">
  @import "./assets/scss/config.scss";
  @import "./assets/scss/reset.scss";
  @import "./assets/scss/button.scss";
</style>
