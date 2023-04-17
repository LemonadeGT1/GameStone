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
            <div class="col-md-4 ps-0">
                <img class="elevation-4 img-fluid gathering-img rounded-start" :src="gathering.coverImg"
                    :alt="gathering.name">
            </div>

            <div class="col-md-7 pt-2">
                <h6>{{ gathering.name }}</h6>
                <p>{{ gathering.description }}</p>
                <p>{{ gathering.date }}</p>
            </div>
        </div>
    </router-link>
</template>


<script>
import { Gathering } from '../models/Gathering.js';

export default {

    props: {
        gathering: { type: Gathering, required: true }
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.gathering-img {
    object-fit: cover;
    object-position: center;
    height: 15vh;
}

.bg-grey {
    background-color: #d9d9d9;
}
</style>