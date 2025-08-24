<script setup>
    import { computed, ref } from 'vue'

    let id = 0

    const taskName = ref('')

    const todoList = ref([])

    const hideCompleted = ref(false)

    // TODO APP FUNCTION
    const sortedAndFilteredTask = computed(() => {
        const sortedTask = todoList.value.toSorted((a, b) => a.completed > b.completed ? 1 : -1)
        return hideCompleted.value
        ? sortedTask.filter((todo) => todo.completed === false)
        : sortedTask
    })

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
</script>

<template>
    <h1>TODO LIST APP</h1>

    <form @submit.prevent="createTask">
        <input type="text" placeholder="New task to do" v-model="taskName" required>
        <button :disabled="taskName.length === 0">Create</button>
    </form>

    <div>
        <input id="toggleState" type="checkbox" v-model="hideCompleted">
        <label for="toggleState">
            {{ hideCompleted? 'Show all tasks' : 'Hide completed tasks' }}
        </label>
    </div>

    <div v-if="sortedAndFilteredTask.length === 0">No task created...</div>
    <div v-else>
        <ul>
            <li v-for="todo in sortedAndFilteredTask" :key="todo.id">
                <input type="checkbox" v-model="todo.completed">
                <span :class="{completed: todo.completed}">{{ todo.title }}</span>
                <button @click="removeTask(todo.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .completed {
        text-decoration: line-through;
    }
    
    .pointer {
        cursor: pointer;
    }
</style>