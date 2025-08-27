<script setup>
    defineProps({
        btnTitle: String
    })

    const emits = defineEmits(['delete'])
    const onClick = () => {
        emits('delete')
    }
</script>

<template>
    <button @click="onClick">{{ btnTitle }}</button>
</template>