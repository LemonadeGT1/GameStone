<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-10 py-3">
                <h2>Game Title</h2>
                <div class="image-fluid text-center">
                    <img src="https://placehold.co/800x200">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-9">
                    <p class="siteText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eius
                        exercitationem provident ratione nam tempora libero eaque eligendi optio quam, laborum iusto
                        recusandae
                        voluptates magnam cupiditate odit facere soluta iure?</p>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-4 offset-2">
                <p>Players: <span class="siteText">min - max</span></p>
            </div>
            <div class="col-4">
                <p>Playtime: <span class="siteText">min - max</span></p>
            </div>
        </div>
        <div class="row">
            <div class="col-4 offset-2">
                <p>Categories: <span class="siteText">[ ]</span></p>
            </div>
            <div class="col-4">
                <p>Mechanics: <span class="siteText">[ ]</span></p>
            </div>
        </div>
        <div class="row justify-content-center mt-4">
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
export default {
    setup() {
        const route = useRoute()

        async function getGameById() {
            try {
                const gameId = route.params.gameId
                logger.log('getGamesById', gameId)
                // await gamesService.getGameById(gameId)
            } catch (error) {
                logger.log(error)
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            getGameById()
        })
        return {

        }
    }
};
</script>


<style lang="scss" scoped>
.siteText {
    color: #008291
}
</style>