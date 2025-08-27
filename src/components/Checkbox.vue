<script setup>
    defineProps({
        todoTitle: String,
        todoState: Boolean
    })

    const emits = defineEmits(['check', 'uncheck'])

    const onChange = (event) => {
        if(event.currentTarget.checked) {
            emits('check', event.currentTarget)
        }
        else {
            emits('uncheck', event.currentTarget)
        }
    }

    const model = defineModel()
</script>
 
<template>
    <label>
        <input type="checkbox" @change="onChange" v-model="model">
        <span :class="{completed: todoState}">{{ todoTitle }}</span>
    </label>
</template>

<style scoped>
    .completed {
        text-decoration: line-through;
    }
</style>