import 'bootstrap/dist/css/bootstrap.min.css';
import './Components.css';


function Todo({todos, toggleTodo, deleteTodo})
{

    return(
        <ul className='TodoList'>
            {todos.map((todo, index) => (
              <li key={index} className="row g-2">
                <div className='col-auto'>{todo.counter}.</div>
                <div className='col-auto'>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id,index)}
                  />
                </div>
                <div className='col-auto'>
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.description}
                  </span>
                </div>
                <div className='col-auto'>
                  <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          );

}
export default Todo;