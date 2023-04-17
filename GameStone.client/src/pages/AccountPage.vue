<template>
  <div class="container-fluid px-0">
    <section class="d-flex justify-content-center">
      <img class="hero-img mx-0" src="https://i.pinimg.com/originals/8e/60/a8/8e60a84fa7f4e85fa16f08d074778c63.jpg"
        :alt="account.name">
      <img class="img-relative profile-picture img-fluid" :src="account.picture" :alt="account.name.id">
    </section>


  </div>


  <!-- <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div> -->
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
/* img {
  max-width: 100px;
} */

.img-relative {
  position: relative;
  bottom: -298px;
}

.profile-picture {
  height: 13vh;
  width: auto;
  border-radius: 50%;
  border-style: solid;
  border-color: #0e0d0d;
  border-width: 2px;
}

.hero-img {
  position: absolute;
  object-fit: cover;
  object-position: center;
  height: 39vh;
  width: 100vw;
  border-bottom: #0e0d0d;
  border-style: solid;
  border-width: 2px;
}
</style>
