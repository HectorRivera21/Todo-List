import { useState } from "react";
import firebase from 'firebase/compat/app';

interface Props 
{
	onCancel:()=>void;
}

function SignUp ({onCancel}:Props)
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!email || !password) {
			alert('Email and password are required');
			return;
		}
		if (password.length < 8) {
			alert('Password must be at least 8 characters long');
			return;
		}

        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => 
        {
            // Sign up successful, show success message or redirect to login page
            console.log('Success '+ name);
            onCancel();
        }).catch((error) => {
            setError(error.message);
        });
  }
  return(
    <section id="loginSection" className="vh-100">
        <div className="container py-5 h-100">
            <h1 id='titleSignup'className='text-justify-center'>Sign Up Here</h1>
            <div className="row d-flex justify-content-center align-items-center h-100">
                
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-2-strong">
                        <div className="card-body p-5 text-center">

                            <h3 className="mb-5">Sign up</h3>
                            <form onSubmit={handleSubmit}>
                                {error && <p className="error">{error}</p>}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="typeEmailX-2">FirstName</label>
                                    <input type="name" id="FirstName" className="form-control form-control-lg" value={name} onChange={(event)=>setName(event.target.value)}/>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="typeEmailX-2">LastName</label>
                                    <input type="name" id="LastName" className="form-control form-control-lg"/>
                                </div>
                                <div className="form-outline mb-4"> 
                                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                    <input type="email" id="typeEmailX-2" className="form-control form-control-lg" value={email} onChange={(event)=>setEmail(event.target.value)}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                                </div>

                                <button className="btn btn-primary mx-2 btn-lg btn-block" type="submit">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )

}
export default SignUp;