# VUE BASIC TODO LIST APPLICATION
This is a simple todo list application that i made for testing and onboarding Vue 3

**Tools used for**
* vue@3.5.19
* vite@7.1.3
* bootstrap-icons@1.13.1
* bootstrap@5.3.8

This mini-application includes the following **features**:
* Task creation using the **createTask()** method
```javascript
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
```

* Deleting tasks using the **removeTask()** method
```javascript
const removeTask = (todoId) => {
    todoList.value = todoList.value.filter((todo) => todo.id !== todoId)
}
```

* Calculating the processing time of a task using the **useTime** composable
```javascript
import { useTimer } from '@/composable/useTimer'
...
const { time } = useTimer(props)
```

* Declare a task as completed by changing its property using the **v-model="todo.completed"**
```javascript
<Checkbox v-model="todo.completed"/>
```

* Filter the tasks to be displayed using a computed property **sortedAndFilteredTask**
```javascript
const sortedAndFilteredTask = computed(() => {
    const sortedTask = todoList.value.toSorted((a, b) => a.completed > b.completed ? 1 : -1)
    return hideCompleted.value
    ? sortedTask.filter((todo) => todo.completed === false)
    : sortedTask
})
```

* Count the number of tasks to be done using a computed property **todoTaskCount**
```javascript
const todoTaskCount = computed(() => {
    return todoList.value.filter((todo) => todo.completed === false).length
})
```

**Application overview**
<img width="977" height="385" alt="image" src="https://github.com/user-attachments/assets/1aef63a4-9f6b-46bc-b976-6b7e157935c5" />
