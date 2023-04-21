<template>
    <div class="container-fluid">
        <div class="row justify-content-start">
            <div class="col-xl-1 col-lg-2 col-md-3 col-sm-4">
                <h5>Filter By:</h5>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 col-sm-4 mx-2 my-1">
                <div class="dropdown open">
                    <button class="btn btn-secondary dropdown-toggle rounded-pill" type="button" id="triggerId"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Category
                    </button>
                    <div class="dropdown-menu scrollable-menu" aria-labelledby="triggerId">
                        <button class="dropdown-item" v-for="c in categories" @click="filterByCategory(c.id)">{{ c.name
                        }}</button>
                        <button class="dropdown-item" href="#">Action</button>
                        <button class="dropdown-item disabled" href="#">Disabled action</button>
                    </div>
                </div>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 col-sm-4 mx-2 my-1">
                <div class="dropdown open">
                    <button class="btn btn-secondary dropdown-toggle rounded-pill" type="button" id="triggerId"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Mechanic
                    </button>
                    <div class="dropdown-menu scrollable-menu" aria-labelledby="triggerId">
                        <button class="dropdown-item" v-for="m in mechanics" @click="filterByMechanic(m.id)">{{ m.name
                        }}</button>
                        <button class="dropdown-item" href="#">Action</button>
                        <button class="dropdown-item disabled" href="#">Disabled action</button>
                    </div>
                </div>
            </div>
            <div class="col-xl-2 col-lg-2 col-md-3 mx-2 my-1">
                <button @click="clearAll()" class="btn btn-danger border rounded-pill"> Clear All</button>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { gamesService } from '../services/GamesService.js';
export default {
    setup() {

        const filterCategories = ref('')
        const categories = AppState.gameCategories

        const filterMechanics = ref('')
        const mechanics = AppState.gameMechanics

        return {
            categories,
            mechanics,

            async clearAll() {
                try {
                    await gamesService.clearAll()
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            },

            Games: computed(() => {
                if (!filterCategories.value) {
                    return AppState.games
                } else { return AppState.games.filter(c => c.categories == filterCategories.value) }
            }),

            async filterByCategory(id) {
                try {
                    const categoryQuery = id
                    Pop.toast('Filtering Games!', 'success', 'top', 10000)
                    await gamesService.filterByCategory(categoryQuery)
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            },

            async filterByMechanic(id) {
                try {
                    const mechanicQuery = id
                    Pop.toast('Filtering Games!', 'success', 'top', 10000)
                    await gamesService.filterByMechanic(mechanicQuery)
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            },
        }
    }
};
</script>


<style lang="scss" scoped>
.scrollable-menu {
    height: auto;
    max-height: 600px;
    overflow-x: hidden;
}
</style>