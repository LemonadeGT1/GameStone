<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-10 py-3">
                <h2>{{ game.name }}</h2>
                <div class="">
                    <p class="siteText" id="gameDescription"><img :src="game.image_url" class="imgContainer ms-4 mb-3"
                            style="float:right">{{ gameDescription }}</p>
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-9">

                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-4 offset-2">
                <p>Players: <span class="siteText">{{ game.min_players }} - {{ game.max_players }}</span></p>
            </div>
            <div class="col-4">
                <p>Playtime: <span class="siteText">{{ game.min_playtime }} - {{ game.max_playtime }}</span></p>
            </div>
        </div>
        <div class="row">
            <div class="col-4 offset-2">
                <p>Categories: <span class="siteText">{{ game.categories.length }}</span></p>
            </div>
            <div class="col-4">
                <p>Mechanics: <span class="siteText">{{ game.mechanics.length }}</span></p>
            </div>
        </div>
        <div class="row justify-content-center my-4">
            <div class="col-3">
                <button class="btn btn-info border rounded-pill">Create a Gathering</button>
            </div>
            <div class="col-3">
                <button class="btn btn-info border rounded-pill">Find Gatherings</button>
            </div>
            <div class="col-3">
                <button class="btn btn-info border rounded-pill">Add Game to Collection</button>
            </div>
        </div>
    </div>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { gamesService } from "../services/GamesService.js"
export default {
    setup() {
        const route = useRoute()

        async function getGameById() {
            try {
                const gameId = route.params.gameId
                const game = await gamesService.getGameById(gameId)
            } catch (error) {
                logger.log(error)
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            getGameById()
        })
        return {
            game: computed(() => AppState.activeGame),
            gameDescription: computed(() => AppState.activeGame.description?.replace(/<[^>]+>|&quot;/g, ' '))
        }
    }
};
</script>


<style lang="scss" scoped>
.imgContainer {
    height: 40vh;
    width: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
    transition: 0.3s;
    border-radius: 30px;
    background-color: #d9d9d9;
}

.siteText {
    color: #008291
}
</style>