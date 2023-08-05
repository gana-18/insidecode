function Login(){
  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_API}/auth/google`,"_self")
  }
  return (
    <>
    <div className="login">
      <div className="login-btn">
        <h1>Sign up / Log in</h1>
        <div>
          <img src="/images/icons8-google-32.png" alt="google"/>
          <button onClick={googleAuth}>Continue with Google</button>
        </div>
      </div>
      <div className="login-text">
        <p>"It's amazing to see how fast devs go
              from 0 to Blog 🤯. It reminds me a lot of
              what Substack did for journalists."</p>
        <p>Guillermo Rauch</p><span>CEO, Vercel</span>
      </div>
      <div className="kidimg">
        <img src="/images/fun-3d-illustration-cartoon-kid-with-vr-helmet.jpg" alt="kid"/>
      </div>
    </div>
       
    </>
    
  )
}

export default Login
