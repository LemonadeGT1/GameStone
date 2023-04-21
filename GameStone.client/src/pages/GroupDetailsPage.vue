<template>
    <div class="container-fluid">
        <!-- SECTION - Banner / Group Image -->
        <section class="row justify-content-center bannerMargins">
            <div class="col-md-9">
                <section class="row my-3 justify-content-between bg-secondary rounded">
                    <div class="col-md-8 p-4 px-5">
                        <div class="py-2 overflow-auto">
                            <h1 class="text-dark">{{ group?.name }}</h1>
                            <h4>{{ group?.description }}</h4>

                            <img :src="group?.creator.picture" class="profilePic selectable" :title="group?.creator?.name"
                                @click="gotoProfile(group?.creator.id)">
                        </div>
                    </div>
                    <div class="col-md-3 p-0 goTop">
                        <img class="group-img img-fluid group-imgRounded" :src="group?.imgUrl" :alt="group?.name">
                    </div>
                </section>
            </div>
        </section>
        <!-- SECTION - Buttons -->
        <section class="row justify-content-between m-3">
            <div class="col-md-4">
                <button v-if="group?.creatorId == account?.id" class="btn btn-info border selectable rounded-pill mx-3"
                    data-bs-toggle="modal" data-bs-target="#editGroupModal">Edit Group</button>
                <button v-if="group?.creatorId == account?.id" @click="deleteGroup(group.id)"
                    class="btn btn-danger border selectable rounded-pill mx-3">Delete Group</button>
            </div>
            <div class="col-md-4 flexButtons">
                <!-- <button class="btn btn-info border selectable rounded-pill mx-3">View our games</button> -->
                <button v-if="!isMember" @click="becomeMember()"
                    class="btn btn-info border selectable rounded-pill mx-3">Join Us!</button>
                <button v-else="isMember" @click="leaveGroup()"
                    class="btn btn-danger border selectable rounded-pill mx-3">Leave Us!</button>
            </div>
        </section>
        <!-- SECTION - Profile Images -->
        <section class="row justify-content-center">
            <div class="col-9 m-3 pill-Rounded p-4">
                <img :src="gm.profile?.picture" class="profilePic selectable" :title="gm.profile?.name"
                    v-for="gm in groupMembers" :key="gm?.id" @click="gotoProfile(gm.profile?.id)">
            </div>
            <div class="col-9 pill-Rounded m-3">
            </div>
        </section>
        <!-- SECTION - Chat -->
        <section class="row justify-content-center p-2 chatTop mt-3">
            <div class="col-10 ">
                <form @submit.prevent="addGroupComment()">
                    <div class="d-flex justify-content-center my-3">
                        <input placeholder="Let's Discuss" class="w-50 border-dark px-3 p-2" type="text"
                            v-model="editable.body">
                        <button class="btn btn-info border border-dark selectable rounded-pill mx-3"
                            type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div v-if="account.lightMode" class="row justify-content-center chatCard bg-white">
                <!-- <div class="col-10 my-1 p-0 bg-grey comContainer" v-for="gc in activeGroupComments" :key="gc?.id">
                    <img :src="gc.creator?.picture" class="profilePic" :title="gc.creator?.name">
                    <span class="pt-2 pb-3 ps-4 pe-3 comText">{{ gc?.body }}</span>
                </div> -->
                <div class="col-8 my-1 p-0 bg-grey comContainer" v-for="gc in activeGroupComments" :key="gc?.id">
                    <div class="row">
                        <div class="col-md-1 col-sm-2">
                            <img :src="gc.creator?.picture" class="profilePic" :title="gc.creator?.name">
                        </div>
                        <div class="col-sm-10 align-self-center col-md-11 ps-4"><span class="pt-2 comText">{{ gc?.body
                        }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="row justify-content-center chatCard bg-dark-gray">
                <div class="col-8 my-1 p-0 bg-grey comContainer" v-for="gc in activeGroupComments" :key="gc?.id">
                    <div class="row">
                        <div class="col-md-1 col-sm-2">
                            <img :src="gc.creator?.picture" class="profilePic border" :title="gc.creator?.name">
                        </div>
                        <div class="col-sm-10 col-md-11 ps-4"><span class="pt-2 pb-3 pe-3 comText">{{ gc?.body }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <Modal id="editGroupModal">

        <template #header>
            <h5 class="text-dark">Edit Group</h5>
        </template>

        <template #modalBody>
            <GroupEditForm />
        </template>

    </Modal>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { groupsService } from '../services/GroupsService.js';
import { useRoute, useRouter } from 'vue-router';
import { Account } from "../models/Account.js";
import { commentsService } from "../services/CommentsService.js";
import GroupEditForm from '../components/GroupEditForm.vue';
import { profilesService } from '../services/ProfilesService.js';
import { gamesService } from '../services/GamesService.js';
export default {
    setup() {
        const route = useRoute()
        const editable = ref({})
        const router = useRouter()

        async function getGroupById() {
            try {
                let groupId = route.params.groupId
                await groupsService.getGroupById(groupId)
                await groupsService.getMembersByGroupId(groupId)
                await groupsService.getCommentsByGroupId(groupId)
            } catch (error) {
                logger.log(error.message)
                Pop.error(error.message)
            }
        }

        async function getGroupMembersGames() {
            try {
                AppState.profileGames = []
                await AppState.groupMembers.forEach(gm => {
                    let accountId = gm.profile.id
                    logger.log(accountId, 'PROFILE IDSSSSS')
                    gamesService.getGroupMembersGames(accountId)

                });
            } catch (error) {
                logger.log(error.message)
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            getGroupById()
            getGroupMembersGames()
        })
        return {
            editable,
            account: computed(() => AppState.account),
            group: computed(() => AppState.activeGroup),
            groupMembers: computed(() => AppState.groupMembers),
            isMember: computed(() => {
                const res = AppState.groupMembers.find(a => a.profileId == AppState.account.id)
                return res
            }),
            activeGroupComments: computed(() => AppState.activeGroupComments),


            async deleteGroup(groupId) {
                try {
                    logger.log('Group ID', groupId)
                    if (await Pop.confirm('Are you sure you want to delete this group?')) {
                        await groupsService.deleteGroup(groupId)
                        router.push('/groups')
                    }
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            },

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
                    const groupMember = AppState.groupMembers.find(gm => gm.profileId == AppState.account.id)
                    await groupsService.leaveGroup(groupMember.id)
                } catch (error) {

                }
            },

            gotoProfile(profileId) {
                logger.log(profileId)
                router.push({ name: 'Profile', params: { accountId: profileId } })
            },

            async addGroupComment() {
                try {
                    logger.log('addGroupComment')
                    let commentData = editable.value
                    commentData.groupId = route.params.groupId
                    logger.log('add group comment commentData', commentData)
                    await commentsService.addGroupComment(commentData)
                    editable.value = {}
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }, components: { GroupEditForm }
};
</script>


<style lang="scss" scoped>
.profilePic {
    border-radius: 30px;
    height: 6vh;
    width: auto;
    z-index: 700 !important;
    position: relative;
}

.comContainer {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
}

.comText {
    z-index: 600 !important;
    position: relative;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    padding-left: 2rem;
}


.group-imgRounded {
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
}

.pill-Rounded {
    border-radius: 50em;
    border-style: double;
    border-color: #cbcbcb;
    border-width: 6px;
}

.bannerMargins {
    margin-top: 24px;
    margin-bottom: 24px;
}

.flexButtons {
    display: flex;
    justify-content: end;
}

.chatCard {
    border-style: solid;
    border-width: 2px;
    border-color: rgb(22, 22, 22);
    border-radius: 0.375rem;
    padding: 2vh;
}

.chatTop {
    background-color: #cbcbcb;
    border-color: rgb(22, 22, 22);
    // border-top: solid;
    // border-bottom: solid;
    border-style: solid;
    border-width: 2px;
    border-radius: 0.375rem;
}

.scrollableBio {
    height: auto;
    max-height: 600px;
    overflow: auto;
}




@media screen and (max-width: 768px) {

    .goTop {
        order: -1;
    }


    .group-imgRounded {
        border-top-right-radius: 0.375rem;
        border-top-left-radius: 0.375rem;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .pill-Rounded {
        border-radius: 0.375rem;
    }

    .bannerMargins {
        margin-top: 0px;
    }

    .flexButtons {
        justify-content: start;
        margin-top: 6px;
    }

}
</style>