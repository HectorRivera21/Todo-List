import './Components.css';

function Login({login}) 
{
    return(
        <div>
            <button onClick={login}>Sign in with Google</button>
        </div>
    )
}
export default Login;