<template>
    <div class="">


    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { groupsService } from '../services/GroupsService.js';
import { useRoute } from 'vue-router';
export default {
    setup() {
        let route = useRoute()

        async function getGroupById() {
            try {
                let groupId = route.params.groupId
                await groupsService.getGroupById(groupId)
            } catch (error) {
                logger.log(error.message)
                Pop.error(error.message)
            }
        }

        onMounted(() => getGroupById())
        return {

        }
    }
};
</script>


<style lang="scss" scoped></style>