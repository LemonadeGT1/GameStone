<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 border-bottom border-light">
    <router-link class="navbar-brand text-info d-flex" :to="{ name: 'Home' }">
      <img src="../assets/img/icons8-carrom-64 2.svg" alt="">
      <h1>GameStone</h1>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
      </ul>
      <router-link :to="{ name: 'About' }" class="btn text-light selectable text-uppercase mx-2">
        About
      </router-link>
      <div v-if="account.id" class="btn text-light selectable text-uppercase mx-2" @click="gotoProfile(account.id)">
        My Profile
      </div>
      <router-link :to="{ name: 'Games' }" class="btn text-light selectable text-uppercase mx-2">
        Games
      </router-link>
      <router-link :to="{ name: 'Groups' }" class="btn text-light selectable text-uppercase mx-2">
        Groups
      </router-link>
      <router-link :to="{ name: 'Gatherings' }" class="btn text-light selectable text-uppercase mx-2">
        Gatherings
      </router-link>
      <button v-if="account.id" @click="changeMode()" class="btn mx-2 text-light selectable"><i
          class="mdi mdi-weather-night"></i></button>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import Login from './Login.vue'
import { AppState } from '../AppState.js';
import { useRoute, useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';

export default {
  setup() {
    const router = useRouter()

    return {
      router,
      account: computed(() => AppState.account),


      async gotoProfile(profileId) {
        logger.log(profileId)
        router.push({ name: 'Profile', params: { accountId: profileId } })
      },

      async changeMode() {
        try {
          this.account.lightMode = !this.account.lightMode
          logger.log(this.account.lightMode, AppState.account.lightMode)
          await accountService.editAccount({ lightMode: this.account.lightMode })
        } catch (error) {
          logger.log(error.message)
          Pop.error(error.message)
        }
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
