<template>
    <div class="container-fluid">
        <section class="row justify-content-center my-4">
            <div class="col-md-9">
                <section class="row my-3 justify-content-between bg-secondary rounded">
                    <div class="col-md-8 p-4 px-5">
                        <div class="py-2">
                            <h1>{{ group?.name }}</h1>
                            <h3>{{ group?.description }}</h3>
                        </div>
                    </div>
                    <div class="col-md-3 p-0">
                        <img class="group-img img-fluid rounded-end"
                            src="https://th.bing.com/th/id/OIP.J4UNEFHLiHXZikZ3ngJ5MwHaHa?pid=ImgDet&rs=1" alt="">
                    </div>
                </section>
            </div>
        </section>
        <section class="row justify-content-end m-3">
            <div class="col-md-4">
                <button class="btn btn-info border rounded-pill mx-3">View our games</button>
                <button @click="becomeMember()" class="btn btn-info border rounded-pill mx-3">Join Us!</button>
            </div>
            <div class="col-10 m-3 d-flex" v-for="gm in groupMembers" :key="gm.id">
                <img :src="gm.profile?.picture" class="profilePic" :title="gm.profile?.name">
            </div>
        </section>
        <section class="row justify-content-center">
            <div class="col-10">
                <div class="d-flex justify-content-center">
                    <input placeholder="Let's Discuss" class="w-50 border-dark px-3 p-2" type="text">
                    <button class="btn btn-info rounded-pill mx-3">Submit</button>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { groupsService } from '../services/GroupsService.js';
import { useRoute } from 'vue-router';
import { Account } from "../models/Account.js";
export default {
    setup() {
        let route = useRoute()

        async function getGroupById() {
            try {
                let groupId = route.params.groupId
                await groupsService.getGroupById(groupId)
                await groupsService.getMembersByGroupId(groupId)
                logger.log('Group Members', AppState.groupMembers)
            } catch (error) {
                logger.log(error.message)
                Pop.error(error.message)
            }
        }

        onMounted(() => getGroupById())
        return {

            group: computed(() => AppState.activeGroup),
            groupMembers: computed(() => AppState.groupMembers),

            async becomeMember() {
                try {
                    let groupId = route.params.groupId
                    await groupsService.becomeMember({ groupId })
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.profilePic {
    border-radius: 50%;
    height: 7vh;
    width: auto;
}
</style>