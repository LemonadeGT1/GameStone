<template>
    <router-link :to="{ name: 'GatheringDetails', params: { gatheringId: gathering.id } }">
        <div class="row  justify-content-evenly">
            <div class="col-md-5 d-flex align-items-center">
                <img class="elevation-4 img-fluid" :src="gathering.coverImg" :alt="gathering.name">
            </div>
            <div class="col-md-7">
                <h5>{{ gathering.name }}</h5>
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
img {
    object-fit: cover;
    object-position: center;
    border-style: solid;
    border-color: black;
    border-radius: 20%;
}
</style>