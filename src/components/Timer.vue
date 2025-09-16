<script setup>
    import { useTimer } from '@/composable/useTimer'

    const props = defineProps({
        isStarted: {
            type: Boolean,
            required: true
        },
        isCompleted: {
            type: Boolean,
            required: true
        }
    })

    const { time } = useTimer(props)
</script>

<template>
    <div ref="div">
        {{ time }} s
    </div>
</template>