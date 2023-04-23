<template>
    <form class="text-dark" @submit.prevent="createGroup()">
        <div class="mb-3">
            <label for="name" class="form-label">Group Name</label>
            <input maxlength="30" placeholder="Group Name" v-model="editable.name" type="text" required class="form-control"
                id="name">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input maxlength="1000" v-model="editable.description" type="text" placeholder="Description" required
                class="form-control" id="description">
        </div>
        <div class="mb-3">
            <label for="imgUrl" class="form-label">Image</label>
            <input v-model="editable.imgUrl" type="url" class="form-control" id="imgUrl" required placeholder="Image URL">
        </div>
        <!-- <div class="mb-3">
            <input type="checkbox" class="form-check-input " id="isPublic" name="isPublic" value=""
                v-model="editable.isPublic"> Private?
            <label class="form-check-label" for="isPublic"></label>
        </div> -->
        <button data-bs-dismiss="modal" type="submit" class="btn btn-success">Submit</button>
    </form>
</template>


<script>
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import { Group } from '../models/Group.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { groupsService } from '../services/GroupsService.js';

export default {
    props: {
        group: {
            type: Group,
            default: {}
        }
    },

    setup(props) {
        const editable = ref({})

        watchEffect(() => {
            editable.value = { ...AppState.activeGroup }
        })

        const router = useRouter()
        const route = useRoute()

        return {
            editable,
            route,

            handleSubmit() {
                if (AppState.activeGroup) {
                    this.editGroup()
                } else {
                    this.createGroup()
                }
            },

            async createGroup() {
                try {
                    const groupData = editable.value
                    // for (const [key, value] of Object.entries
                    // (groupData)) {
                    //     if (value == '') {
                    //         delete groupData[key]
                    //     }
                    // }
                    logger.log('GROUP FORM DATA', groupData)
                    const group = await groupsService.createGroup(groupData)
                    const groupId = group.id
                    AppState.activeGroup = null
                    await groupsService.becomeMember({ groupId })
                    await router.push({ name: 'GroupDetails', params: { groupId: group.id } })
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>