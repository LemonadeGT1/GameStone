<template>
    <div>
        
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { gamesService } from '../services/GamesService.js';
export default {
    setup(){

        async function getGames() {
            try {
                await gamesService.getGames()
            } catch (error) {
                logger.error(error.message)
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            getGames()
        })
        
    return { 

        games: computed(() => AppState.games),
     }
    }
};
</script>


<style lang="scss" scoped>

</style>