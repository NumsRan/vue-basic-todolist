<script setup>
    import { computed, ref, onMounted, onUnmounted } from 'vue'

    import Checkbox from './components/Checkbox.vue'
    import Button from './components/Button.vue'

    let id = 0

    const taskName = ref('')

    const todoList = ref([])

    const hideCompleted = ref(false)

    const container = ref(null)

    const containerSize = ref({width: 0, height: 0})

    let getRect

    // TODO APP FUNCTION
    const createTask = () => {
        if(taskName.value.trim().length > 0) {
            todoList.value.push({
                id: id++,
                title: taskName.value,
                completed: false,
                date: Date.now()
            })

        }
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
            containerSize.value = {width: Math.round(Rect.width), height: Math.round(Rect.height)}
        }, 0)
    })

    onUnmounted(() => {
        clearInterval(getRect)
    })

</script>

<template>
    <section class="container py-3" ref="container">
        <h1>BASIC TODO LIST APP</h1>
    
        <form class="d-flex my-2" @submit.prevent="createTask">
            <input type="text" placeholder="New task to do" class="form-control me-3" v-model="taskName" required>
            <Button 
                class="btn btn-primary"
                btnClass="bi bi-plus-square" 
                :disabled="taskName.length === 0"
            />
        </form>
    
        <div>
            <Checkbox
                checkboxId="hideCompleted"
                :todoTitle="hideCompleted? 'Show all tasks' : 'Hide completed tasks'"
                :isTodoItem="false"
                v-model="hideCompleted"
            />
        </div>
    
        <div v-if="sortedAndFilteredTask.length === 0" class="alert alert-secondary my-2">
            <i class="bi bi-list-task"></i>
            No task to do...✨
        </div>
        <div v-else>
            <div v-if="todoTaskCount > 0" class="alert alert-info my-2">
                <i class="bi bi-list-task"></i>
                {{ todoTaskCount }} Task{{ todoTaskCount > 1 ? 's' : '' }} to do ⚡️
            </div>
            <div v-else class="alert alert-success my-2">
                <i class="bi bi-check-square-fill"></i>
                All tasks done ✨
            </div>
            <ul class="px-0">
                <li v-for="todo in sortedAndFilteredTask" :key="todo.id" class="list-group-item list-group-item-action d-flex align-items-center my-2">
                    <Checkbox 
                        :isTodoItem="true"
                        :checkboxId="todo.id.toString()"
                        :todoTitle="todo.title" 
                        :isCompleted="todo.completed"
                        v-model="todo.completed"
                    />
                    <Button
                        class="btn btn-danger btn-sm ms-auto"
                        btnClass="bi bi-trash-fill"
                        @delete="removeTask(todo.id)"
                    />
                </li>
            </ul>
        </div>

        <hr>
        Width : {{ containerSize.width }}px - Height : {{ containerSize.height }}px
    </section>
</template>

<style scoped>
</style>