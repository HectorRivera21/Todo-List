import firebase from 'firebase/compat/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGoogle } from "react-icons/fa";
import { useState } from 'react';
import './Components.css';

function Login({Google_Login}) 
{
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	

	function handleSubmit(event) {
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
		<section id="loginSection" class="vh-100">
			<div class="container py-5 h-100">
				<h1 id='titleLogin'className='text-justify'>Welcome Create a Free Todo List for Free</h1>
				<div class="row d-flex justify-content-center align-items-center h-100">
					<div class="col-12 col-md-8 col-lg-6 col-xl-5">
						<div class="card shadow-2-strong">
							<div class="card-body p-5 text-center">

								<h3 class="mb-5">Sign in</h3>
								<form onSubmit={handleSubmit}>
									<div class="form-outline mb-4">
										<input type="email" id="typeEmailX-2" class="form-control form-control-lg" value={email} onChange={(event)=>setEmail(event.target.value)}/>
										<label class="form-label" for="typeEmailX-2">Email</label>
									</div>

									<div class="form-outline mb-4">
										<input type="password" id="typePasswordX-2" class="form-control form-control-lg" value={password} onChange={(event)=>setPassword(event.target.value)}/>
										<label class="form-label" for="typePasswordX-2">Password</label>
									</div>

									
									<div class="form-check d-flex justify-content-start mb-4">
										<input class="form-check-input" type="checkbox" value="" id="form1Example3" />
										<label class="form-check-label" for="form1Example3"> Remember password </label>
									</div>

									<button class="btn btn-primary btn-lg btn-block" type="submit">Login</button>
								</form>
								<hr class="my-4"/>

								<button id="google" onClick={Google_Login}class="btn btn-lg btn-block btn-primary"type="submit"><FaGoogle /> Sign in with google</button>

							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Login;