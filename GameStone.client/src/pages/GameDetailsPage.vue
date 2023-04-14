<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-11 py-3">
                <div class="row">
                    <h2>{{ game.name }}</h2>
                    <div class="text-secondary col-8" v-html="game.description"></div>
                    <div class="col-4">
                        <img :src="game.image_url" class="imgContainer ms-4 mb-3">
                    </div>
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-9">

                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-4 offset-2">
                <p>Players: <span class="text-secondary">{{ game.min_players }} - {{ game.max_players }}</span></p>
            </div>
            <div class="col-4">
                <p>Playtime: <span class="text-secondary">{{ game.min_playtime }} - {{ game.max_playtime }}</span></p>
            </div>
        </div>
        <div class="row">
            <div class="col-4 offset-2">
                <p>Categories: <span class="text-secondary" id="gameCategories" v-for="c in activeCategories"
                        :key="c.name"></span></p>
            </div>
            <div class="col-4">
                <p>Mechanics: <span class="text-secondary" id="gameMechanics">{{ activeMechanics }}</span></p>
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
                await gamesService.getGameById(gameId)
                await getCategories()
                await getMechanics()
            } catch (error) {
                logger.log(error)
                Pop.error(error.message)
            }
        }

        function getCategories() {
            let categoriesList = []
            for (let i = 0; i < AppState.activeGame.categories.length; i++) {
                AppState.activeCategories = categoriesList.push(AppState.gameCategories?.find(c => AppState.activeGame?.categories[i].id == c.id).name)
            }
            logger.log('categories', categoriesList)
        }

        function getMechanics() {
            let mechanicsList = []
            for (let i = 0; i < AppState.activeGame.mechanics.length; i++) {
                AppState.activeMechanics = mechanicsList.push(AppState.gameMechanics?.find(c => AppState.activeGame?.mechanics[i].id == c.id).name)
            }
            logger.log('mechanics', mechanicsList)

        }

        onMounted(() => {
            getGameById()
        })
        return {
            game: computed(() => AppState.activeGame),
            activeCategories: computed(() => AppState?.activeCategories),
            activeMechanics: computed(() => AppState?.activeMechanics)
            // gameDescription: computed(() => AppState.activeGame.description?.replace(/<[^>]+>|&quot;/g, ' ')),
            // gameCategories: computed(() => AppState.gameCategories),
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
</style>