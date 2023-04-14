import SignUp from './signUp';
import firebase from 'firebase/compat/app';
import { FaGoogle } from "react-icons/fa";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props 
{
	Google_Login:()=>void;
}
function Login({Google_Login}:Props) 
{
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showSignUp, setShowSignUp] = useState(false);
	

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		// Validate email and password
		if (!email || !password) {
			alert('Email and password are required');
			return;
		}
		if (password.length < 8) {
			alert('Password must be at least 8 characters long');
			return;
		}

		firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
			// User has logged in successfully
			console.log(result.user);
		}).catch((error) => {
			// An error occurred
			console.error(error);
		});
	}
	return(
		<section id="loginSection" className="vh-100">
			{showSignUp? 
			(<SignUp onCancel={()=>setShowSignUp(false)}/>
			):(
			<div className="container py-5 h-100">
				<h1 id='titleLogin'className='text-justify'>Welcome Create a Free To-do List</h1>
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-12 col-md-8 col-lg-6 col-xl-5">
						<div className="card shadow-2-strong">
							<div className="card-body p-5 text-center">

								<h3 className="mb-5">Sign in</h3>
								<form onSubmit={handleSubmit}>
									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="typeEmailX-2">Email</label>
										<input type="email" id="typeEmailX-2" className="form-control form-control-lg" value={email} onChange={(event)=>setEmail(event.target.value)}/>
										
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="typePasswordX-2">Password</label>
										<input type="password" id="typePasswordX-2" className="form-control form-control-lg" value={password} onChange={(event)=>setPassword(event.target.value)}/>
										
									</div>

									
									<div className="form-check d-flex justify-content-start mb-4">
										<input className="form-check-input" type="checkbox" value="" id="form1Example3" />
										<label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
									</div>

								
									<button className="btn btn-primary mx-2 btn-lg btn-block" type="submit">Login</button>
									<button className="btn btn-primary mx-2 btn-lg btn-block"onClick={() => setShowSignUp(true)}>Sign Up</button>
									
								</form>
								<hr className="my-4"/>

								<button id="google" onClick={Google_Login}className="btn btn-lg btn-block btn-primary"type="submit"><FaGoogle /> Sign in with google</button>

							</div>
						</div>
					</div>
				</div>
			</div>
			)}
		</section>
	)
}
export default Login;