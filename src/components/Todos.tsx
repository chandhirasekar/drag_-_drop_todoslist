import React from 'react'
import type { Todo } from '../modal'
import SingleTodo from './SingleTodo'
import { Droppable } from '@hello-pangea/dnd'


interface Props{
    todos: Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>,
    completed:Todo[],
    setCompleted:React.Dispatch<React.SetStateAction<Todo[]>>
}
const Todos:React.FC <Props> = ({todos,setTodos,completed,setCompleted}) => {
  return (

    <div className="container">
      
      
  <Droppable droppableId='Todoslist' isDropDisabled={false} isCombineEnabled={false}>
    {
      (provided)=>(
    <div className='todos' ref={provided.innerRef} {...provided.droppableProps}>
      <span className="todos__heading">Active Todos</span>
        {todos.map((todo,index)=>(
            // <li>{todo.todo}</li>
            <SingleTodo index={index}  key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
        ))}
      {provided.placeholder}
    </div>

      )
    }
  </Droppable>

 <Droppable droppableId='Todosremove' isDropDisabled={false} isCombineEnabled={false}>
  {(provided)=>(
      <div className='todos remove' ref={provided.innerRef} {...provided.droppableProps}>
      <span className="todos__heading">Completed Todos</span>
        {completed.map((todo,index)=>(
            // <li>{todo.todo}</li>
            <SingleTodo index={index}  key={todo.id} todo={todo} todos={completed} setTodos={setCompleted} />
        ))}
      {provided.placeholder}
    </div>

  )}
    </Droppable>

    </div>
  )
}

export default Todos
