<template>
        <form @submit.prevent="editGroup(activeGroup.id)">
        <div class="mb-3">
            <label for="name" class="form-label">Group Name</label>
            <input placeholder="" v-model="editable.name" type="text" class="form-control" id="name">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input v-model="editable.description" type="text" class="form-control" id="description">
        </div>
        <div class="mb-3">
            <label for="imgUrl" class="form-label">Image</label>
            <input v-model="editable.imgUrl" type="url" class="form-control" id="imgUrl" placeholder="image url">
        </div>
        <div class="mb-3">
            <input type="checkbox" class="form-check-input " id="isPublic" name="isPublic" value=""
                v-model="editable.isPublic"> Private?
            <label class="form-check-label" for="isPublic"></label>
        </div>
        <button data-bs-dismiss="modal" type="submit" class="btn btn-success">Submit</button>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect, ref } from 'vue';
import { Group } from '../models/Group.js';
import { logger } from '../utils/Logger.js';
import { groupsService } from '../services/GroupsService.js';
import Pop from '../utils/Pop.js';

export default {
    props: {
        group: {
            type: Group,
            default: {}
        }
    },

    setup(props){
        const editable = ref({})
        watchEffect(() => {
            editable.value = { ...AppState.activeGroup}
        })
    return { 
        editable,
        activeGroup: computed(() => AppState.activeGroup),


        async editGroup(groupId) {
                try {
                    const groupData = editable.value
                    logger.log('Group edit values', groupData, groupId)
                    await groupsService.editGroup(groupData, groupId)
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            },
        }
    }
};
</script>


<style lang="scss" scoped>

</style>