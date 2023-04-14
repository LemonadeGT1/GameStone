<template>
    <form @submit.prevent="handleSubmit()">

        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input v-model="editable.name" type="text" required class="form-control" id="name">
        </div>
        <div class="mb-3">
            <label for="location" class="form-label">Location</label>
            <input v-model="editable.location" type="text" required class="form-control" id="location">
        </div>
        <div class="mb-3">
            <label for="capacity" class="form-label">Capacity</label>
            <input v-model="editable.capacity" type="number" min="2" required class="form-control" id="capacity">
        </div>
        <div class="mb-3">
            <input type="radio" class="form-check-input" id="radio1" name="optradio" value="option1" checked>Option 1
            <label class="form-check-label" for="radio1"></label>
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input v-model="editable.description" type="text" required class="form-control" id="description">
        </div>
        <div class="mb-3">
            <label for="coverImg" class="form-label">Image</label>
            <input v-model="editable.coverImg" type="url" required class="form-control" id="coverImg">
        </div>
        <select v-model="editable.engineType" required class="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example">
            <option v-for="engineType in engineTypes" :key="engineType" :value="engineType">{{ engineType }}</option>
        </select>
    </form>
</template>

<!-- constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator ? new Profile(data.creator) : null
    this.isPublic = data.isPublic
    this.type = data.type
    this.date = data.date
}
} -->





<script>
export default {
    setup() {
        return {};
    },
};
</script>







<style></style>