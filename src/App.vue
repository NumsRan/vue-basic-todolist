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

    const todoTaskCount = computed(() => {
        return todoList.value.filter((todo) => todo.completed === false).length
    })
</script>

<template>
    <h1>TODO LIST APP</h1>

    <form @submit.prevent="createTask">
        <input type="text" placeholder="New task to do" v-model="taskName" required>
        <button :disabled="taskName.length === 0">Create</button>
    </form>

    <div class="toggleState">
        <label>
            <input type="checkbox" v-model="hideCompleted">
            {{ hideCompleted? 'Show all tasks' : 'Hide completed tasks' }}
        </label>
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

    .toggleState {
        margin: 16px 0px;
    }

    input[type='checkbox'] {
        margin-left: 0;
    }
</style>