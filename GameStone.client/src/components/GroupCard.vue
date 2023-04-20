<template>
    <router-link :to="{ name: 'GroupDetails', params: { groupId: group.id } }">
        <section class="row my-3 bg-grey rounded selectable mx-3">
            <div class="col-md-3 p-0">
                <img class="group-img img-fluid" :src="group?.imgUrl" :alt="group?.name">
            </div>
            <div class="col-md-8 p-3">
                <div class="py-2">
                    <h1>{{ group?.name }}</h1>
                    <h3>{{ group?.description }}</h3>
                </div>
                <div class="text-center py-2 ps-5">
                    <h5>Games Here</h5>
                </div>
            </div>
        </section>
    </router-link>
</template>


<script>
import { Group } from '../models/Group.js';

export default {

    props: {
        group: { type: Group, required: true }
    },

    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.group-img {
    object-fit: cover;
    object-position: center;
    height: 24vh;
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0;
}

@media screen and (max-width: 768px) {
    .group-img {
        display: flex;
        justify-content: center;
        width: 100%;
        height: auto;
        border-top-left-radius: 0.375rem;
        border-top-right-radius: 0.375rem;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

    }
}

.bg-grey {
    background-color: #d9d9d9;
}
</style>