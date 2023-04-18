<template>
    <router-link :to="{ name: 'GatheringDetails', params: { gatheringId: gathering.id } }">
        <!-- <div class="row  justify-content-evenly text-dark align-items-center">
            <div class="col-md-5 d-flex align-items-center">
                <img class="elevation-4 img-fluid" :src="gathering.coverImg" :alt="gathering.name">
            </div>
            <div class="col-md-7">
                <h5>{{ gathering.name }}</h5>
                <p>{{ gathering.description }}</p>
                <p>{{ gathering.date }}</p>
            </div>
        </div> -->

        <div class="row row my-3 bg-grey rounded selectable elevation-3 justify-content-start">
            <div class="col-md-3 px-0">
                <img class="elevation-4 img-fluid gathering-img rounded-start" :src="gathering.coverImg"
                    :alt="gathering.name">
            </div>

            <div class="col-md-8 pt-2">
                <h6>{{ gathering.name }}</h6>
                <p>{{ gathering.description }}</p>
                <p>{{ gathering.date }}</p>
            </div>
        </div>
    </router-link>
</template>


<script>
import { computed } from '@vue/reactivity';
import { Gathering } from '../models/Gathering.js';
import { logger } from '../utils/Logger.js';

export default {

    props: {
        gathering: { type: Gathering, required: true }
    },
    setup(props) {

        let todaysDate = new Date().toLocaleDateString()
        return {
            todaysDate,
            inThePast: computed(() => {
                const todaysDate = Date.now()
                const gatheringDate = new Date(props.gathering.date).getTime()
                if (todaysDate > gatheringDate) {
                    return true
                }
                return false
            })
        }
    }
}
</script>


<style lang="scss" scoped>
.gathering-img {
    object-fit: cover;
    object-position: center;
    height: 15vh;
    width: 100%;
}

.bg-grey {
    background-color: #d9d9d9;
}
</style>