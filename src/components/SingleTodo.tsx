import React, { useEffect, useRef, useState } from 'react'
import type { Todo } from '../modal'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Draggable } from '@hello-pangea/dnd';

type Props = {
    index:number,
    todo:Todo,
    todos:Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>,
    
}

const SingleTodo:React.FC<Props> = ({index,todo,todos,setTodos}) => {

   const [edit,setEdit]=useState<boolean>(false);
   const [editTodo,setEditTodo]=useState<string>(todo.todo);



   const handleSubmit = (e:React.FormEvent,id:number)=>{
    e.preventDefault()
    setTodos(todos.map((todo)=>(
        todo.id === id ? {...todo,todo:editTodo} : todo
    )))
    setEdit(false)
   }

    const handleDelete = (id:number)=>{
      setTodos(todos.filter((todo)=> todo.id !== id))
    }



    const handleDone = (id:number)=>{
        setTodos(todos.map((todo)=>(

            todo.id === id ? {...todo,isDone:!todo.isDone}: todo
        )
        ));
    }

    const inputRef = useRef<HTMLInputElement>(null)


    useEffect(()=>{
        inputRef.current?.focus()
    },[edit])


    
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
     {(provided)=>(
   <form  {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className='todos__single' onSubmit={(e)=>handleSubmit(e,todo.id)}>
    {  edit ? <input className="todos__single--text" ref={inputRef} type='text' value={editTodo} onChange={(e)=>setEditTodo(e.target.value)}/>:
        todo.isDone ? (<s className="todos__single--text">{todo.todo}</s>):(<span className="todos__single--text">{todo.todo}</span>)
    }
    

    <div>
        <span className="icon"  onClick={()=>{
            if(!edit && !todo.isDone){
                setEdit(true)
                
            }
        }

        }>
        <AiFillEdit/>
        </span>

        <span className="icon" onClick={()=>handleDelete(todo.id)}>
        <AiFillDelete/>
        </span>
        <span className="icon" onClick={()=>handleDone(todo.id)}>
        <MdDone/>
        </span>
    </div>

   </form>

     )}

    </Draggable>
  )
}

export default SingleTodo
