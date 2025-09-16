<script setup>
    const emits = defineEmits(['delete'])
    const onClick = () => {
        emits('delete')
    }
</script>

<template>
    <button @click="onClick">
        <slot></slot>
    </button>
</template>