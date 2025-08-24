<script setup>
    import { computed, ref } from 'vue'

    let id = 0

    const taskName = ref('')

    const todoList = ref([])

    const hideCompleted = ref(false)

    // TODO APP FUNCTION
    const filteredTask = computed(() => {
        return hideCompleted.value
        ? todoList.value.filter((todo) => todo.completed === false)
        : todoList.value
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

    const updateTaskAndSort = (todo) => {
        todo.completed = !todo.completed
        todoList.value.sort((a, b) => a.completed > b.completed ? 1 : -1)
    }

    const removeTask = (todoId) => {
        todoList.value = todoList.value.filter((todo) => todo.id !== todoId)
    }
</script>

<template>
    <h1>TODO LIST APP</h1>

    <form @submit.prevent="createTask">
        <input type="text" placeholder="New task to do" v-model="taskName" required>
        <button>Create</button>
    </form>

    <div @click="hideCompleted = !hideCompleted" class="pointer">
        <input type="checkbox" :checked="hideCompleted" class="pointer">
        <span>{{ hideCompleted? 'Show all tasks' : 'Hide completed tasks' }}</span>
    </div>

    <div v-if="filteredTask.length === 0">No task created...</div>

    <ul>
        <li v-for="todo in filteredTask" :key="todo.id">
            <input type="checkbox" @click="updateTaskAndSort(todo)" :checked="todo.completed">
            <span :class="{completed: todo.completed}">{{ todo.title }}</span>
            <button @click="removeTask(todo.id)">Delete</button>
        </li>
    </ul>
</template>

<style scoped>
    .completed {
        text-decoration: line-through;
    }
    
    .pointer {
        cursor: pointer;
    }
</style>