<template>
    <form @submit.prevent="handleSubmit()">
        <h5>Create Gathering!</h5>
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input v-model="editable.name" type="text" required class="form-control" id="name">
        </div>
        <div class="mb-3">
            <label for="location" class="form-label">Location</label>
            <input v-model="editable.location" type="text" required class="form-control" id="location">
        </div>
        <div class="mb-3">
            <label for="capacity" class="form-label">Capacity</label>
            <input v-model="editable.capacity" type="number" min="2" required class="form-control" id="capacity">
        </div>
        <div class="mb-3">
            <input type="radio" class="form-check-input" id="isPublic" name="isPublic" value="option1"
                v-model="editable.isPublic">Private?
            <label class="form-check-label" for="isPublic"></label>
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input v-model="editable.description" type="text" required class="form-control" id="description">
        </div>
        <div class="mb-3">
            <label for="coverImg" class="form-label">Image</label>
            <input v-model="editable.coverImg" type="url" required class="form-control" id="coverImg">
        </div>
        <div class="mb-3">
            <label for="date" class="form-label">Date</label>
            <input v-model="editable.date" type="date" required class="form-control" id="date">
        </div>

        <button type="submit" class="btn btn-success"><i class="mdi mdi-plus-thick" data-bs-dismiss="modal"></i></button>
    </form>
</template>





<script>
import { computed, reactive, onMounted, ref } from 'vue';
import { Gathering } from '../models/Gathering.js';
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { gatheringsService } from '../services/GatheringsService.js';

export default {
    props: {
        gathering: {
            type: Gathering,
            default: true
        }
    },

    setup(props) {


        const editable = ref({ ...props.gathering })

        const router = useRouter()

        return {
            editable,


            handleSubmit() {
                if (props.gathering.id) {
                    this.editGathering()
                } else {
                    this.createGathering()
                }
            },


            async createGathering() {
                try {
                    const gatheringData = editable.value
                    const gathering = await gatheringsService.createGathering(gatheringData)
                    router.push({ name: 'GatheringDetails', params: { gatheringId: gathering.id } })
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            },

            async editGathering() {
                try {
                    const gatheringData = editable.value
                    await gatheringsService.editGathering(gatheringData)
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            }
        };
    },
};
</script>







<style></style>