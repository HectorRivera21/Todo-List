import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrashAlt } from "react-icons/fa";

interface Todos 
{
  id:string;
  description: string;
  completed: boolean;
  user: string;
  counter: number;
}

interface Props 
{
	todos: Todos[],
  toggleTodo:(id:string, index: number)=>void ,
  deleteTodo:(id:string)=>void
}

function Todo({todos, toggleTodo, deleteTodo}:Props)
{

  return(
    <div>
      <div>
        <ul className="list-group mb-0">
          {todos.map((todo, index) => (
            <li key={index} className="list-group-item d-flex align-items-center border-0 mb-2 rounded">
              <div className='col-auto'>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id,index)}
                  className="form-check-input me-2"
                />
              </div>
              <div className='col-auto'>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.description}
                </span>
              </div>
              <div>
                <i className="d-flex text-danger align-items-center px-4 rounded" onClick={() => deleteTodo(todo.id)}><FaTrashAlt /></i>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}
export default Todo;