<template>
    <div class="container-fluid">
        <!-- SECTION - Banner / Group Image -->
        <section class="row justify-content-center my-4">
            <div class="col-md-9">
                <section class="row my-3 justify-content-between bg-secondary rounded">
                    <div class="col-md-8 p-4 px-5">
                        <div class="py-2" style="position:absolute">
                            <h1>{{ group?.name }}</h1>
                            <h3>{{ group?.description }}</h3>
                            <img :src="group?.creator.picture" class="profilePic" :title="group?.creator.name"
                                style="position:relative; bottom: 0px; left: 0px;">
                        </div>
                    </div>
                    <div class="col-md-3 p-0">
                        <img class="group-img img-fluid rounded-end"
                            src="https://th.bing.com/th/id/OIP.J4UNEFHLiHXZikZ3ngJ5MwHaHa?pid=ImgDet&rs=1" alt="">
                    </div>
                </section>
            </div>
        </section>
        <!-- SECTION - Buttons -->
        <section class="row justify-content-end m-3">
            <div class="col-md-4">
                <button class="btn btn-info border selectable rounded-pill mx-3">View our games</button>
                <button v-if="!isMember" @click="becomeMember()"
                    class="btn btn-info border selectable rounded-pill mx-3">Join Us!</button>
                <button v-else="isMember" @click="leaveGroup()"
                    class="btn btn-danger border selectable rounded-pill mx-3">Leave Us!</button>
            </div>
        </section>
        <!-- SECTION - Profile Images -->
        <section class="row justify-content-center">
            <div class="col-9 m-3">
                <img :src="gm.profile?.picture" class="profilePic selectable" :title="gm.profile?.name"
                    v-for="gm in groupMembers" :key="gm?.id" @click="gotoProfile(gm.profile?.id)">
            </div>
        </section>
        <!-- SECTION - Chat -->
        <section class="row justify-content-center">
            <div class="col-10">
                <div class="d-flex justify-content-center">
                    <input placeholder="Let's Discuss" class="w-50 border-dark px-3 p-2" type="text">
                    <button class="btn btn-info border selectable rounded-pill mx-3">Submit</button>
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
import { useRoute, useRouter } from 'vue-router';
import { Account } from "../models/Account.js";
export default {
    setup() {
        let route = useRoute()
        let router = useRouter()

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
            isMember: computed(() => {
                const res = AppState.groupMembers.find(a => a.profileId == AppState.account.id)
                logger.log('computed res', res)
                logger.log('AppState.account.id computed', AppState.account.id)
                return res
            }),

            async becomeMember() {
                try {
                    let groupId = route.params.groupId
                    await groupsService.becomeMember({ groupId })
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            },

            async leaveGroup() {
                try {
                    const groupId = route.params.groupId
                    // find group member id
                    // appstate.groupmembers profileID = account.id
                    const groupMember = AppState.groupMembers.find(gm => gm.profileId == AppState.account.id)
                    logger.log('AppState.account.id leaveGroup', AppState.account.id)
                    logger.log('groupMember', groupMember)
                    logger.log('Leaving Group groupId', groupId)
                    await groupsService.leaveGroup(groupMember.id)
                } catch (error) {

                }
            },

            gotoProfile(profileId) {
                logger.log(profileId)
                router.push({ name: 'Profile', params: { accountId: profileId } })
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