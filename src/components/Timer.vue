<script setup>
    import { useTimer } from '@/composable/useTimer'

    const props = defineProps({
        isStarted: Boolean,
        isCompleted: Boolean
    })

    const { time } = useTimer(props)
</script>

<template>
    <div ref="div">
        {{ time }} s
    </div>
</template>