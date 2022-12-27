//component imports and state/effect
import React, { useState, useEffect } from 'react';
import Todo from './Components/Todos';
import Login from './Components/Login';
//firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// styling sections
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
interface Todos 
{
  id:string;
  description: string;
  completed: boolean;
  user: string;
}
function App() {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [user, setUser] = useState<firebase.User | null>(null);
  const firebaseConfig: Record<string,string> = {
    apiKey: "AIzaSyCE3Dnvjt7v6nygHbXu_qBM6kZMQjX_2Is",
    authDomain: "hector-todo-list-firebase.firebaseapp.com",
    projectId: "hector-todo-list-firebase",
    storageBucket: "hector-todo-list-firebase.appspot.com",
    messagingSenderId: "464920494261",
    appId: "1:464920494261:web:0e05031c894f029ac2befc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize Firestore
  const firestore = firebase.firestore();
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        firestore.collection('todos').where('user', '==', user.uid).onSnapshot((snapshot) => {
          const newTodos: any = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setTodos(newTodos);
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const descriptionElement = form.getElementById('description') as HTMLInputElement;
    const description = descriptionElement.value;
    if (description.trim() === '') {
      // show an error message
      alert('The description field cannot be empty');
      return;
    }
    firestore.collection('todos').add({
      description,
      completed: false,
      user: firebase.auth().currentUser?.uid,
    });
    form.reset();
  }

  function toggleTodo(id:string, index:number):void {
    firestore.collection('todos').doc(id).update({
      completed: !todos[index].completed
    });
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  }
  function deleteTodo(id:string):void {
    firestore.collection('todos').doc(id).delete().then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    }).catch((error) => {
      console.error("Error deleting todo: ", error);
    });
  }
  function Google_Login():void {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
      setUser(result.user);
      firestore.collection('todos').where('user', '==', firebase.auth().currentUser?.uid).orderBy('counter','asc').onSnapshot((snapshot) => {
        const newTodos:any = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setTodos(newTodos);
      });
    });
  }
  function logout () {
    firebase.auth().signOut().then(() => {
      setUser(null);
    });
  }
  return (
    <div className="App">
      {user ? (
        <section id="todoSection" className="vh-100 gradient-custom">
          <div className='d-flex px-2 py-2' >
            <button className="btn btn-primary"onClick={logout}>Logout</button>
          </div>
          <div className="container p-2 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">

                <div className="card">
                  <div className="card-body p-5">
                    <h1 className='todoTitle'>My Todo List</h1>
                    <form className="d-flex justify-content-center align-items-center mb-4" onSubmit={handleSubmit}>
                      <div className="form-outline flex-fill">
                        <input type="text" id="form2" className="form-control" placeholder='add To-do...' name="description" />
                      </div>
                      <button type="submit" id="add" className="btn btn-info ms-2">Add Todo</button>
                    </form>
                    <Todo todos = {todos} deleteTodo= {deleteTodo} toggleTodo={toggleTodo}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Login Google_Login={Google_Login}/>
      )}
    </div>
  );
}
export default App;