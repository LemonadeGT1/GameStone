<template>
  <!-- <div class="container-fluid px-0">
    <button @click="gotoProfile(account?.id)">Go to Profile Page...</button>
    <section class="d-flex justify-content-start banner-size">
      <img class="hero-img mx-0 elevation-3" :src="account.coverImg" :alt="account.name">
      <img class="img-relative profile-picture img-fluid selectable" :src="account.picture"
        :alt="account.name + account.id" title="Edit Profile" data-bs-toggle="modal" data-bs-target="#editAccountModal">
    </section>
  </div>
  <div class="container-fluid">
    <section class="row p-3">
      <div class="col-md-3">
      </div>
      <div class="col-md-8 p-3 bio-background">
        <h3 class="pb-3">Name: {{ account.name }}</h3>
        <h6>Biography:</h6>
        <p>{{ account.bio }}</p>
      </div>
    </section>

  </div> -->


  <div class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-between">
        <div class="h1">Edit Profile <i class="mdi mdi-pencil-outline selectable" title="Edit Profile"
            data-bs-toggle="modal" data-bs-target="#editAccountModal"></i>

        </div>
        <button @click="gotoProfile(account?.id)">Back to Profile Page</button>
      </div>

      <div class="col-12">
        <div class="row">
          <div class="col-4">
            <h5>Profile Picture:</h5>
            <img class="profile-picture img-fluid selectable" :src="account.picture" :alt="account.name + account.id">
          </div>
        </div>
      </div>
      <div class="col-12">
        <h5>Cover Photo:</h5>
        <img class="hero-img mx-0 elevation-3 w-100" :src="account.coverImg" :alt="account.name">
      </div>
      <div class="col-12">
        <section class="row p-3">
          <h5>Description:</h5>
          <div class="col-md-8 p-3 bio-background">
            <h3 class="pb-3">Name: {{ account.name }}</h3>
            <h6>Biography:</h6>
            <p>{{ account.bio }}</p>
          </div>
        </section>
      </div>
    </div>

  </div>

  <Modal id="editAccountModal">

    <template #header>
      <h5>Edit Account!</h5>
    </template>

    <template #modalBody>
      <EditAccountForm />
    </template>

  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import { gatheringsService } from '../services/GatheringsService.js'
import { gamesService } from '../services/GamesService.js'
import { groupsService } from '../services/GroupsService.js'
import EditAccountForm from '../components/EditAccountForm.vue'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'


export default {
  setup() {
    const router = useRouter()

    return {
      account: computed(() => AppState.account),
      async getMyGames() {
        try {
          const profileId = this.account.id;
          await gamesService.getMyGames(profileId);
        }
        catch (error) {
          logger.log(error.message)
          Pop.error(error.message)
        }
      },
      async getMyGatherings() {
        try {
          const profileId = this.account.id;
          await gatheringsService.getMyGatherings(profileId);
        }
        catch (error) {
          logger.error(error.message);
          Pop.error(error.message);
        }
      },
      async getGatheringsIOwn() {
        try {
          const profileId = this.account.id;
          await gatheringsService.getGatheringsIOwn(profileId);
        }
        catch (error) {
          logger.error(error.message);
          Pop.error(error.message);
        }
      },
      async getMyGroups() {
        try {
          const profileId = this.account.id;
          await groupsService.getMyGroups(profileId);
        }
        catch (error) {
          logger.error(error.message);
          Pop.error(error.message);
        }
      },
      gotoProfile(profileId) {
        logger.log(profileId)
        router.push({ name: 'Profile', params: { accountId: profileId } })
      },
    };
  },
  components: { EditAccountForm }
}
</script>

<style scoped>
/* img {
  max-width: 100px;
} */

.img-relative {
  position: relative;
  bottom: -267px;
  left: 100px;
}

.profile-picture {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border-style: solid;
  border-color: #0e0d0d;
  border-width: 2px;
}



.hero-img {
  /* position: absolute; */
  object-fit: cover;
  object-position: center;
  height: 39vh;
  /* width: 100vw; */
  border-bottom: #0e0d0d;
  border-style: solid;
  border-width: 2px;
}

.banner-size {
  height: 39vh;
  width: 100vw;
}

.my-stuff-buttons {
  border-style: solid;
  border-width: 2px;
  border-color: #0e0d0d;
  text-align: center;
}

.my-stuff-buttons:hover {
  text-decoration: underline;
}

.bio-background {
  background: rgba(0, 131, 145, 0.419);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border: 1px solid rgba(255, 251, 251, 0.548);


}
</style>
