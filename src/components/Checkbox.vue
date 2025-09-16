<script setup>
    import Timer from './Timer.vue'
    import Button from './Button.vue'
    import { ref } from 'vue'

    defineProps({
        todoTitle: {
            type: String,
            required: true
        },
        isCompleted: {
            type: Boolean,
            required: false
        },
        checkboxId: {
            type: String,
            required: true
        },
        isTodoItem: {
            type: Boolean,
            required: true
        }
    })

    const startTimer = ref(false)

    const model = defineModel()
</script>
 
<template>
    <div v-if="isTodoItem" class="d-flex align-items-center w-100">
        <input type="checkbox" class="form-check-input me-1 mt-0" :id="checkboxId" v-model="model">
        <label :for="checkboxId" class="form-check-label">
            <span :class="{completed: isCompleted}">{{ todoTitle }}</span>
        </label>
        <Timer :isStarted="startTimer" :isCompleted="isCompleted" class="ms-auto me-2"/>
        <Button 
            :class="startTimer? 'btn btn-danger btn-sm me-2' : 'btn btn-success btn-sm me-2'"
            :disabled="isCompleted"
            @click="startTimer = !startTimer"
        >
            <i :class="startTimer? 'bi bi-stop-circle' : 'bi bi-skip-start-circle-fill'"></i>
        </Button>
    </div>
    <div v-else>
        <input type="checkbox" class="form-check-input me-1" :id="checkboxId" v-model="model">
        <label :for="checkboxId" class="form-check-label">
            <span :class="{completed: isCompleted}">{{ todoTitle }}</span>
        </label>
    </div>
</template>

<style scoped>
    .completed {
        text-decoration: line-through;
    }
</style>