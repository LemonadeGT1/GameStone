<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main v-if="!account.lightMode" class="bg-dark-gray">
    <router-view />
  </main>
  <main v-else class="bg-primary">
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      account: computed(() => AppState.account)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.bg-dark-gray {
  background-color: #363232;
  color: white;
}
</style>
