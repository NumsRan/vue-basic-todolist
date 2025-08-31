<script setup>
    import { useTimer } from '@/composable/useTimer';
    import Button from './Button.vue';

    const {time, reset} = useTimer()
</script>

<template>
    <div ref="div">
        Mounted sense : {{ time }} second{{ time > 1 ? 's' : '' }}
    </div>
    <Button btnTitle="Reset timer" @click="reset"/>
</template>