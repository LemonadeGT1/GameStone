<template>
    <form @submit.prevent="handleSubmit()">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input placeholder="New Gathering" v-model="editable.name" type="text" class="form-control" id="name">
        </div>
        <div class="mb-3">
            <label for="location" class="form-label">Location</label>
            <input v-model="editable.location" type="text" placeholder="" class="form-control" id="location">
        </div>
        <div class="mb-3">
            <label for="capacity" class="form-label">Capacity</label>
            <input v-model="editable.capacity" type="number" required min="2" class="form-control" id="capacity">
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input v-model="editable.description" type="text" class="form-control" id="description">
        </div>
        <div class="mb-3">
            <label for="coverImg" class="form-label">Image</label>
            <input v-model="editable.coverImg" type="url" class="form-control" id="coverImg">
        </div>
        <div class="mb-3">
            <label for="date" class="form-label">Date</label>
            <input required v-model="editable.date" type="datetime-local" class="form-control" id="date">
        </div>
        <div class="mb-3">
            <input type="radio" class="form-check-input" id="isPublic" name="isPublic" value=false
                v-model="editable.isPublic"> Private?
            <label class="form-check-label" for="isPublic"></label>
        </div>
        <div class="mb-3">
            <input type="radio" class="form-check-input" id="isPublic" name="isPublic" value="true"
                v-model="editable.isPublic"> Public?
            <label class="form-check-label" for="isPublic"></label>
        </div>
        <button data-bs-dismiss="modal" type="submit" class="btn btn-success">Submit</button>
    </form>
</template>





<script>
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import { Gathering } from '../models/Gathering.js';
import { useRoute, useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { gatheringsService } from '../services/GatheringsService.js';
import { AppState } from '../AppState.js';


export default {
    props: {
        gathering: {
            default: {}
        }
    },

    setup(props) {


        const editable = ref({})

        watchEffect(() => {
            editable.value = { ...AppState.activeGathering }
        })

        const router = useRouter()
        const route = useRoute()

        return {
            editable,
            route,


            handleSubmit() {
                if (AppState.activeGathering) {
                    this.editGathering()
                } else {
                    this.createGathering()
                }
            },



            async createGathering() {
                try {
                    const gatheringData = editable.value
                    for (const [key, value] of Object.entries(gatheringData)) {
                        if (value == '') {
                            delete gatheringData[key]
                        }
                    }
                    logger.log(gatheringData, '[GATHERING DATA]')
                    const gathering = await gatheringsService.createGathering(gatheringData)
                    await router.push({ name: 'GatheringDetails', params: { gatheringId: gathering.id } })
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