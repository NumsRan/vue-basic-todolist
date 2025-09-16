<script setup>
    defineProps({
        btnClass: {
            type: String,
            required: true
        }
    })

    const emits = defineEmits(['delete'])
    const onClick = () => {
        emits('delete')
    }
</script>

<template>
    <button @click="onClick">
        <i :class="btnClass"></i>
    </button>
</template>