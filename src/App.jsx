import { useRef, useState, useEffect } from 'react'
import './App.css'

function App() {

  let localStorageData = localStorage.getItem("todos");
  let savedTodos = localStorageData ? (localStorageData.split(",").filter(todo => todo!='')) : [];
  let savedTheme = localStorage.getItem("Theme");
  // console.log(savedTheme);
  
  let myTheme = savedTheme != null ? savedTheme : 'false';

  // console.log(savedTheme);

  if (myTheme === 'false') myTheme = false
  else if (myTheme === 'true') myTheme = true
  // console.log(myTheme);
  

  // App states

  const [todos, setTodos] = useState(savedTodos);
  const [inputVal, setInputVal] = useState("")
  const [theme, setTheme] = useState(Boolean(savedTheme))
  const [todoCount, setTodoCount] = useState(0)
  const inputRef = useRef(null)


  useEffect(() => {
    scrollToDocumentBottom();
    saveTodos()
    setTodoCount(todos.length)
  }, [todos])

  useEffect(() => {
    saveThemeSettings()
    // console.log(savedTheme);
  }, [theme])

  window.onscroll = function(){
    console.log(document.body.scrollHeight);
    
  }

  function addTodo() {
    let newTodo = inputVal
    setInputVal("")
    if (newTodo) {
      setTodos([...todos, newTodo]);
    } else {
      alert("todo can't be empty")
    }
  }

  function deleteTodo(todoID) {
    let updateTodos = todos.filter((todo, index) => {
      if (index != todoID) return todo
    })
    console.log(updateTodos);
    setTodos(updateTodos);
  }

  function handleKeyDown(e) {
    if (e.key == "Enter") {
      addTodo()
    }
  }


  function saveTodos() {
    localStorage.setItem("todos", todos)
  }

  function saveThemeSettings(){
    localStorage.setItem("Theme", theme);
  }

  function scrollToDocumentBottom() {
    const scrollingElement = document.scrollingElement || document.body;
    scrollingElement.scrollTop = scrollingElement.scrollHeight + 500;
    // console.log(scrollingElement, scrollingElement.scrollHeight);
    
  }
  



  return (
    <div className={theme ? "dark" : "light"}>
      <div
        className='app w-full h-fit min-h-screen relative mx-auto flex flex-col gap-2 px-6 md:px-[10%] lg:px-[15%] pt-6 dark:bg-slate-800 dark:text-white'
      >
        <h1 className='w-full sticky top-0 py-6 my-2 text-2xl md:text-4xl bg-white text-slate-700 z-10 font-semibold flex flex-row gap-6 items-center justify-between sm:justify-start dark:bg-gray-800 dark:text-white'>Todo Tasks <span className='w-fit h-fit text-sm font-semibold rounded-lg bg-slate-100 py-2 px-3 text-slate-800 border border-slate-400 dark:bg-slate-500 dark:text-white'>{todoCount >= 10 ? todoCount : `0${todoCount}`}</span>
          <button
            className='text-sm px-3 py-2 shadow-md rounded-full bg-white text-slate-700 dark:bg-slate-400 dark:text-white'
            onClick={() => setTheme(!theme)}
          >
            {theme ? "🌙 Dark" : "☀️ Light"}
          </button>
        </h1>
        <input type="text" name="todo-input" id="todo-input"
          placeholder='write and press enter'
          className='w-full sticky top-20 border-none p-4 z-10 placeholder:italic bg-slate-100 dark:bg-slate-500 dark:text-white dark:placeholder:text-gray-300 outline-slate-400'
          value={inputVal}
          ref={inputRef}
          onChange={(e) => setInputVal(e.currentTarget.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <div className='todo-list w-full sticky top-52 py-6'>
          {todos.map((todo, index) => (
            <div key={index}
              className={`todo-item w-full flex flex-row justify-between items-center px-6 py-4 gap-8 mt-3 bg-slate-100 border border-slate-300 dark:bg-slate-600 dark:text-white dark:border-slate-500`}
            >
              <p
                className='text-slate-600 border-none outline-none dark:text-gray-300'
              >{todo}</p>
              <button
                className='delete-btn bg-slate-200 text-white p-2 border border-slate-300 translate-x-[50px] opacity-0 hover:bg-slate-300 text-sm dark:bg-slate-500 dark:border-slate-400 dark:hover:bg-slate-400'
                onClick={() => deleteTodo(index)}
              >✔</button>
            </div>
          ))}
          {todos.length === 0 && (<p className='text-xl mt-4'>😔 No todos to show. Add a Todo to get started 🚀.</p>)}
        </div>
      </div>
    </div>

  )
}

export default App
