<template>
    <div class="container-fluid">

        <section class="row my-3 justify-content-center">
            <div class="col-md-5">
                <h1 v-if="account.lightMode" class="text-secondary">Local Groups</h1>
                <h1 v-else>Local Groups</h1>
                <div>
                    <GroupSearchBar />
                </div>
            </div>
            <div class="col-md-5 text-end">
                <button v-if="account?.id" class="btn btn-info border rounded-pill selectable" data-bs-toggle="modal"
                    data-bs-target="#groupModal">Create Group</button>
            </div>
        </section>
        <section class="row justify-content-center">
            <div v-for="g in groups" class="col-lg-9">
                <GroupCard :group="g" />
            </div>
            <div class="col-md-9">
                <h1 v-if="!groups[0]" class="text-center">No Results</h1>
            </div>
        </section>
    </div>

    <Modal id="groupModal">

        <template #header>
            <h5 class="text-dark">Create Group!</h5>
        </template>

        <template #modalBody>
            <CreateGroupForm />
        </template>

    </Modal>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { groupsService } from '../services/GroupsService.js';
import GroupCard from '../components/GroupCard.vue'
import CreateGroupForm from '../components/CreateGroupForm.vue';

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
            account: computed(() => AppState.account),
            groups: computed(() => AppState.groups)

        }
    }, components: { GroupCard, CreateGroupForm }
};
</script>


<style lang="scss" scoped></style>