<template>
    <router-link :to="{ name: 'GroupDetails', params: { groupId: group.id } }">
        <section class="row my-3 bg-grey rounded selectable">
            <div class="col-md-3 p-0">
                <img class="group-img img-fluid rounded-start"
                    :src="group?.imgUrl" :alt="group?.name">
            </div>
            <div class="col-md-8 p-3">
                <div class="py-2">
                    <h1>{{ group?.name }}</h1>
                    <h3>{{ group?.description }}</h3>
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
}

.bg-grey {
    background-color: #d9d9d9;
}
</style>