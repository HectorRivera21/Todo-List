import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const description = form.elements.description.value;
    firestore.collection('todos').add({
      description,
      completed: false,
      user: firebase.auth().currentUser.uid
    });
    form.reset();
  }

  function toggleTodo(index) {
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  }

  function login() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
      setUser(result.user);
      firestore.collection('todos').where('user', '==', firebase.auth().currentUser.uid).onSnapshot((snapshot) => {
        const newTodos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setTodos(newTodos);
      });
    });
  }

  return (
    <div className="App">
      {user ? (
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <input type="text" name="description" />
            <button type="submit">Add Todo</button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button onClick={login}>Sign in with Google</button>
      )}
      
    </div>
  );
}

export default App;
