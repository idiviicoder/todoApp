import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
const App = () => {

  const [todo, setTodo] = useState("");
  const[todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)

  useEffect(()=>{
    let todoString  = localStorage.getItem("todos");
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);
    }
    
  },[]);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);
    saveToLS();
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);
    saveToLS();
  }

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}]);
    setTodo("");
    console.log(todos);
    saveToLS();
  }

    const handleChange = (e) => {
      setTodo(e.target.value)
  }

 const handleCheckbox = (e) => {
  let id = e.target.name;
  let index = todos.findIndex(item=>{
    return item.id===id;
  })
  let newTodos = [...todos];
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  setTodos(newTodos);
  saveToLS();
 }

 const toggleFinished = (e) =>{
  setShowFinished(!showFinished)
 }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh]">
      <div className="addTodo my-5">
        <h2 className='text-lg font-bold'>Add a Todo</h2>
        <input onChange={handleChange} value={todo} type="text" className='border-1 w-1/2' />
        <button onClick={handleAdd} disabled={todo.length<=3} className='text-white p-3 py-1 rounded-md mx-6 font-bold disabled:bg-violet-300 bg-violet-600 hover:bg-violet-950'>Add</button>
      </div>
      <input onChange={toggleFinished} type="checkbox" checked = {showFinished} /> Show finished
      <h2 className='font-bold text-lg'>Your Todos</h2>
      <div className="todos">
        {todos.map(item=>{

        
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 justify-between">
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted?"line-through":""}>
                {item.todo}
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='my-1 text-white p-3 py-1 rounded-md mx-2  font-bold bg-violet-600 hover:bg-violet-950'>Edit</button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='my-1 text-white p-3 py-1 rounded-md mx-2  font-bold bg-violet-600 hover:bg-violet-950'>Delete</button>
              </div>

          </div>
      })}
      </div>
      
    </div>
    </>
  )
}

export default App
