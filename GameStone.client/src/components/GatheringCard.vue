<template>
    <router-link :to="{ name: 'GatheringDetails', params: { gatheringId: gathering.id } }">

        <div class="row row my-3 bg-grey rounded selectable elevation-3 justify-content-start">
            <div class="col-md-4 px-0">
                <img class="elevation-4 img-fluid gathering-img" :src="gathering.coverImg" :alt="gathering.name">
            </div>

            <div class="col-md-8 pt-2">
                <div class="row flex-column">
                    <h6>{{ gathering.name }}</h6>
                    <p>{{ truncateDescription(gathering?.description) }}</p>
                    <p>{{ gathering.date }}</p>
                </div>
                <div class="row">
                    <div class="col-md-12 gatheringGamesSpot rounded p-2 d-flex align-items-center flex-wrap">
                        <h5 class="pe-2">Games:</h5>
                        <img :title="g?.gameName" class="gatheringGameCard" v-for="g in gathering?.games" :key="g?.gameId"
                            :src="g?.gameImg" :alt="g?.gameName">
                    </div>
                </div>

            </div>
        </div>

    </router-link>
</template>


<script>
import { computed } from 'vue'
import { Gathering } from '../models/Gathering.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';

export default {

    props: {
        gathering: { type: Gathering, required: true }
    },
    setup(props) {

        return {
            truncateDescription(text) {
                const characterLimit = 67;
                if (text.length > characterLimit) {
                    text = text.substring(0, characterLimit) + "\u2026";
                }
                return text;
            },
        }
    }
}
</script>


<style lang="scss" scoped>
.gathering-img {
    object-fit: cover;
    object-position: center;
    min-height: 100%;
    width: 50vw;
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0;
}

@media screen and (max-width: 768px) {
    .gathering-img {
        border-top-left-radius: 0.375rem;
        border-top-right-radius: 0.375rem;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        width: 100%;
    }
}

.bg-grey {
    background-color: #d9d9d9;
}

.gatheringGameCard {
    height: 28px;
    width: 28px;
    border-radius: 0.4rem;
    background-color: white;
    margin: 4px;
}
</style>