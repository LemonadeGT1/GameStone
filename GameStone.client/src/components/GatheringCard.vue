<template>
    <div>
        <img :src="gathering.coverImg" alt="">
    </div>
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


<style lang="scss" scoped></style>