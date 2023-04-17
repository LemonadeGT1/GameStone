<template>
  <div class="justify-content-center container-fluid">
    <!-- SECTION HERO IMG-->
    <section class="row justify-content-center">
      <div class="col-12 p-0">
        <img class="img-fluid position-relative hero-img"
          src="https://images.pexels.com/photos/5691866/pexels-photo-5691866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="hero-img">
      </div>
      <div class="col-10 position-absolute mt-5 image-text">
        <h1>Welcome to GameStone, the one stop shop for finding players of all kinds to game it out with! Hit one of the
          above buttons to take a look or click on one of these suggested one!</h1>
      </div>
    </section>
    <!-- SECTION GROUPS -->
    <section class="row justify-content-center p-2 my-3">
      <div class="col-7 card elevation-5 d-flex flex-column justify-content-between py-2">
        <div>
          <h3 class="pb-2">Find a Group</h3>
          <p>Wanting to find a people to start playing with? Search through our 100's of local playgroups that are open to
            new players! Make new friends and find new games. Imagine what new adventures are awaiting you! Hit the link
            below to start your journey and find a group.</p>
        </div>
        <div>
          <router-link :to="{ name: 'Groups' }">
            <p>Go to Group Page...</p>
          </router-link>
        </div>
      </div>
      <div class="col-4 d-flex justify-content-center">
        <img class="img-fluid elevation-5 rounded group-img"
          src="https://images.unsplash.com/photo-1643992356285-6eb7c466f505?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80"
          alt="group-img">
      </div>
    </section>
    <!-- SECTION GATHERINGS -->
    <section class="row justify-content-center p-2">
      <div class="col-4 d-flex justify-content-center">
        <img class="img-fluid rounded elevation-5 gathering-img"
          src="https://images.unsplash.com/photo-1677188010559-0667a1ed33a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1113&q=80"
          alt="gathering-img">
      </div>
      <div class="col-7 card rounded elevation-5 d-flex flex-column justify-content-between py-2">
        <div>
          <h3 class="pb-2">Join a Gathering</h3>
          <p>Looking for a specific game to play? Bored of your old games and want to try some new one? Hit the link below
            and search through our local gatherings of people playing game! Meet some new friends and start up your own
            group, the opportunities are endless!</p>
        </div>
        <div>
          <router-link :to="{ name: 'Gatherings' }">
            <p>Go to Gatherings Page...</p>
          </router-link>
        </div>

      </div>

    </section>
  </div>
  <footer class="container-fluid mt-3 pt-2">
    <p class="text-white">Made with 😭 by The DC Room</p>
  </footer>
</template>

<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
export default {
  setup() {
    return {
      mechanics: computed(() => AppState.gameMechanics)
    }
  }
}
</script>

<style scoped lang="scss">
.image-text {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-img {
  height: 40vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.group-img {
  height: 25vh;
  object-fit: cover;
  object-position: center;
}

.gathering-img {
  height: 25vh;
  object-fit: cover;
  object-position: center;
}

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.card {
  background-color: rgb(247 244 241) !important;
}

footer {
  background-color: #0e0d0d;
}
</style>
