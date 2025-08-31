import { onMounted, onUnmounted, ref } from 'vue'

export function useTimer(initial = 0) {
    const time = ref(initial)

    let timer

    onMounted(() => {
        timer = setInterval(() => {
            console.log('Mounted...')
            time.value++
        }, 1000)
    })

    onUnmounted(() => {
        console.log('Unmounted...')
        clearInterval(timer)
    })

    return {
        time,
        reset() {
            clearInterval(timer)
            timer = setInterval(() => {
                console.log('Mounted...')
                time.value++
            }, 1000)
            time.value = 0
        }
    }
}