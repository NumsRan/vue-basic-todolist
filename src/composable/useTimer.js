import { ref, watch } from 'vue'

export function useTimer(props) {
    const time = ref(0)
    let timer = null

    watch(
        () => ({ started: props.isStarted, completed: props.isCompleted }),
        (newState) => {
            if (newState.started) {
                console.log('Timer started...')
                if (!timer) {
                    timer = setInterval(() => {
                        time.value++
                    }, 1000)
                }
            } else {
                console.log('Timer stopped...')
                clearInterval(timer)
                timer = null
            }

            if (newState.completed) {
                console.log('Task completed...')
                clearInterval(timer)
                timer = null
            }
        },
        { immediate: true }
    )

    return { time }
}
