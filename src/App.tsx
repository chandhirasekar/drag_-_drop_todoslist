import React, { useState } from 'react'
import './App.css'
import InputFields from './components/InputFields'
import type { Todo } from './modal';
import Todos from './components/Todos';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';


// let name: string;
//  name = "chandru";

// let age : number;

//union
// let uninonage : number | string;

// let isStudent: boolean;

// let hobbies: string[];

// hobbies = ["32","32"]

//tuple
// let role:[number,string]
// role = [22,"llll"]


//one of typescript allies
// type Person = {
//   name:string,
//   age?:number  //? optional
// }


// let persons: Person={ 
//   name:"chandhru"
// }

// let lotsofpeople : Person[];

// lotsofpeople = [
//   {name:"chandhru"}
// ]

// let print : Function;

// let print : (name:string) => string;

// print = (name)=>{

//  return name
// }

// console.log(print("chanhdru"))



// number → returns a number
// string → returns text
// boolean → returns true/false
// void → returns nothing

// function print(name:string){
//   return name
// }

// console.log(print("chanhdru"))

// type Y = {
//   name:string,
//   age:number
// }

// type X = Y & {
//   isStudent:boolean,
// }


// let y : X ={
//   name:"st",
//   age:30,
//   isStudent:true
// }

// interface PersonTwo {
// name: string,
// }

// interface PersonThree extends PersonTwo{
//   age?:number
// }

// let answer: PersonThree={
//   name:"UJHIOUERFJ",

// }

const  App : React.FC =() =>{
  const [todo, setTodo] = useState<string>("");
  const [todos,setTodos] = useState<Todo[]>([]);
  const [completed,setCompleted]=useState<Todo[]>([])


  const handleForm =(e:React.FormEvent)=>{
   e.preventDefault()
   if(todo){
    setTodos([...todos,{id:Date.now(),todo:todo,isDone:false}])
    setTodo("")
   }
  }

  console.log(todos)

  const dragEnd = (result:DropResult)=>{
    console.log(result,"result")
    let {source,destination} = result;
    if(!destination) return;

    if(destination.droppableId == source.droppableId && destination.index == source.index) return

    let add;
    let active = todos;
    let complete = completed;

    if(source.droppableId == "Todoslist"){
      add = active[source.index]
      active.splice(source.index , 1)
    }else{
      add = complete[source.index]
      complete.splice(source.index,1)
    }

    if(destination.droppableId == "Todoslist"){
      active.splice(destination.index,0,add)
    }else{
      complete.splice(destination.index,0,add)
    }

    setTodos(active)
    setCompleted(complete)


  }

  return (
    <DragDropContext onDragEnd={dragEnd} >

    <div className="App">
     <span className="heading">
      Taskify
     </span>
     <InputFields todo={todo} setTodo={setTodo} handleForm={handleForm}/>
     <Todos todos={todos} setTodos={setTodos} completed={completed} setCompleted={setCompleted}/>
    </div>
    </DragDropContext>
  )
}

export default App
