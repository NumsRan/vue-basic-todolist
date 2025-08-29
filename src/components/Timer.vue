<script setup>
    import { onMounted, onUnmounted, ref } from 'vue'

    const time = ref(0)

    let timer

    onMounted(() => {
        timer = setInterval(() => {
            console.log("Mounted...")
            time.value++
        }, 1000)
    })

    onUnmounted(() => {
        clearInterval(timer)
        console.log("Unmounted...")
    })
</script>

<template>
    <div ref="div">
        Mounted sense : {{ time }} second{{ time > 1 ? 's' : '' }}
    </div>
</template>