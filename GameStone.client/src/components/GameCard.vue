<template>
    <img class="img-fluid elevation-3 rounded p-2 my-2 bg-white game-card" :src="game.image_url" :alt="game.name">
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Game } from '../models/Game.js';
export default {

    props: {
        game: { type: Game, required: true }
    },

    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

.game-card {
    height: 50vh;
    width: 50vh;
}



</style>