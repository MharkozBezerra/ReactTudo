
import "./App.css";
import {useState, useEffect} from 'react';
import {BsTrash, BsBookmarkCheck,BsBookmarkCheckFill} from 'react-icons/bs';

const API = "http://localhost:5000";


function App() {
   const [title,setTitle] = useState("");
   const [time,setTime] = useState("");
   const [todos,setTodos] = useState([]);
   const [loading,setLoading] = useState(false);
  

   // Carrega todos quando iniciar a pagina
   useEffect(()=>{
    const loadData = async()=>{
      setLoading(true);

      const res = await fetch(`${API}/todos`)
                        .then((res)=> res.json())
                        .then((data)=> data)
                        .catch((err)=>console.log(`Retorno do erro: `,err));

      setLoading(false);
      setTodos(res);

    }
    loadData();
   },[]);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const todo = {
      id:Math.random(),
      title,
      time,
      done:false
    };

    await fetch( `${API}/todos`,
    {
      method:"POST",
      body:JSON.stringify(todo),
      headers:{
        "Content-Type":"application/json",
      }
    }
    )
    
    setTitle("");
    setTime("");
    setTodos((prevStates)=>[...prevStates,todo]);
  }
 
  const handleDelete = async(id)=>{

    await fetch( `${API}/todos/${id}`,
    {
      method:"DELETE",
    }
    );
    setTodos((prevStates)=>[...prevStates.filter((todo) => todo.id !== id)]);
  };

  const handleEdit = async (todo)=>{
   
    todo.done = !todo.done;
    const data = await fetch( `${API}/todos/${todo.id}`,
    {
      method:"PUT",
      body:JSON.stringify(todo),
      headers:{
        "Content-Type":"application/json",
      }
    }
    )
    
    setTitle("");
    setTime("");
    setTodos((prev) => prev.map((e)=>(e.id === data.id ? (e =data) : e)));
  }
  if(loading){
    return <p>Aguarde ...</p>
  }
   return (
    <div className="App">
      <div className="todo-header">
        <h1>React Todo</h1>
      </div>
      <div className="todo-form">
      <h2>Informe sua tarefa</h2>
       <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">O que você vai fazer?</label>
          <input 
            type="text" 
            name="ttile" 
            placeholder="Título da tarefa" 
            onChange={(e)=>setTitle(e.target.value)} 
            value={title || ""}
            required
            />
        </div>
        <div className="form-control">
          <label htmlFor="time">Duração</label>
          <input 
            type="text" 
            name="time" 
            placeholder="Tempo estimado (em horas)" 
            onChange={(e)=>setTime(e.target.value)} 
            value={time || ""}
            required
            />
        </div>
        <input type="submit" value="Criar tarefa"/>
       </form>
      </div>
      <div className="todo-list">
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Sem tarefas no momento</p>}
        {todos.map((todo)=>(
          <div className="todo" key={todo.id}> 
            <h3 className={todo.done ? 'todo-none' : ''}>{todo.title}</h3>
            <p>Duração: {todo.time}</p>
           <div className="actions">
              <span onClick={()=>{ handleEdit(todo)}}>{!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill/>}</span>
              <BsTrash onClick={()=> handleDelete(todo.id)}/>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;