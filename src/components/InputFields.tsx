import React, { useRef } from 'react'
import "./styles.css"

interface Props{
    todo:string,
    setTodo:React.Dispatch<React.SetStateAction<string>>,
    handleForm:(e:React.FormEvent)=>void,
}

const InputFields:React.FC<Props> = ({todo,setTodo,handleForm}) => {
    let inputRef = useRef<HTMLInputElement>(null)
  return (
    <form className='input' onSubmit={(e)=>{inputRef.current?.blur();handleForm(e)}}>
        <input ref={inputRef} value={todo} onChange={(e)=>setTodo(e.target.value)} type='text' placeholder='Enter a task' className='input__box'/>
        <button className='input_submit' type='submit'>
            Go
        </button>

    </form>
  )
}

export default InputFields
