<template>
    <section class="row my-3 justify-content-center">
        <div class="col-md-5">
            <h1>Local Groups</h1>
            <div>
                <GroupSearchBar/>
            </div>
        </div>
        <div class="col-md-5 text-end">
            <button class="btn btn-info border rounded-pill">Create A Group</button>
        </div>
    </section>
    <section class="row justify-content-center">
        <div v-for="g in groups" class="col-md-9">
            <GroupCard :group="g" />
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { groupsService } from '../services/GroupsService.js';
import GroupCard from '../components/GroupCard.vue'

export default {
    setup() {

        async function getAllGroups() {
            try {
                await groupsService.getAllGroups()
            } catch (error) {
                logger.log(error.message)
                Pop.error(error.message)
            }
        }

        onMounted(() => getAllGroups())

        return {

            groups: computed(() => AppState.groups)

        }
    }, components: { GroupCard }
};
</script>


<style lang="scss" scoped></style>