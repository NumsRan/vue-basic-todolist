<script setup>
    import { computed, ref, onMounted, onUnmounted } from 'vue'

    import Checkbox from './components/Checkbox.vue'
    import Button from './components/Button.vue'
    import Timer from './components/Timer.vue'

    let id = 0

    const taskName = ref('')

    const todoList = ref([])

    const hideCompleted = ref(false)

    const showTimer = ref(true)

    const container = ref(null)

    const containerSize = ref({width: 0, height: 0})

    let getRect

    // TODO APP FUNCTION
    const createTask = () => {
        todoList.value.push({
            id: id++,
            title: taskName.value,
            completed: false,
            date: Date.now()
        })
        
        taskName.value = ''
    }

    const removeTask = (todoId) => {
        todoList.value = todoList.value.filter((todo) => todo.id !== todoId)
    }

    const sortedAndFilteredTask = computed(() => {
        const sortedTask = todoList.value.toSorted((a, b) => a.completed > b.completed ? 1 : -1)
        return hideCompleted.value
        ? sortedTask.filter((todo) => todo.completed === false)
        : sortedTask
    })

    const todoTaskCount = computed(() => {
        return todoList.value.filter((todo) => todo.completed === false).length
    })

    onMounted(() => {
        getRect = setInterval(() => {
            const Rect = container.value.getBoundingClientRect()
            containerSize.value = {width: Rect.width, height: Rect.height}
        }, 0)
    })

    onUnmounted(() => {
        clearInterval(getRect)
    })

</script>

<template>
    <div class="container" ref="container">
        <h1>TODO LIST APP</h1>
    
        <Timer v-if="showTimer"/>
        <Button
            :btnTitle="showTimer? 'Hide timer' : 'Show timer'"
            @click="showTimer = !showTimer"
            class="mb-16"
        />
    
        <form @submit.prevent="createTask">
            <input type="text" placeholder="New task to do" v-model="taskName" required>
            <Button 
                btnTitle="Create" 
                :disabled="taskName.length === 0"
            />
        </form>
    
        <div class="toggleState">
            <Checkbox
                :todoTitle="hideCompleted? 'Show all tasks' : 'Hide completed tasks'"
                v-model="hideCompleted"
            />
        </div>
    
        <div v-if="sortedAndFilteredTask.length === 0">No task to do...✨</div>
        <div v-else>
            <p v-if="todoTaskCount > 0">
                {{ todoTaskCount }} Task{{ todoTaskCount > 1 ? 's' : '' }} to do ⚡️
            </p>
            <p v-else>
                All tasks done ✨
            </p>
            <ul>
                <li v-for="todo in sortedAndFilteredTask" :key="todo.id">
                    <Checkbox 
                        :todoTitle="todo.title" 
                        :todoState="todo.completed" 
                        @check="(p) => console.log('checked', p)" 
                        @uncheck="(p) => console.log('unchecked', p)"
                        v-model="todo.completed"
                    />
                    <Button
                        btnTitle="Delete"
                        @delete="removeTask(todo.id)"
                    />
                </li>
            </ul>
        </div>

        <hr>
        Width : {{ containerSize.width }} Height : {{ containerSize.height }}
    </div>
</template>

<style scoped>
    .container {
        width: 50vw;
        margin: auto;
    }

    h1 {
        margin: 16px 0;
    }

    ul {
        padding: 0;
    }

    li {
        list-style-type: none;
    }

    .toggleState {
        margin: 16px 0px;
    }

    .mb-16 {
        margin-bottom: 16px;
    }
</style>