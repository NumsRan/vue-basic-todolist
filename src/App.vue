<script setup>
    import { computed, ref } from 'vue'

    import Checkbox from './components/Checkbox.vue'
    import Button from './components/Button.vue'

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
                    @uncheck="console.log('unchecked')"
                    v-model="todo.completed"
                />
                <Button
                    btnTitle="Delete"
                    @delete="removeTask(todo.id)"
                />
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .toggleState {
        margin: 16px 0px;
    }

    input[type='checkbox'] {
        margin-left: 0;
    }
</style>