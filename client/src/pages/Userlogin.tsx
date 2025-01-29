import { url } from "../constants";

const Userlogin = () => {
     
  const googleLogin = async ()=> {
    window.location.href = `${url}/auth/google`; //This will cause the browser to navigate to the /auth/google route on your server. Once the user reaches that route, they will be redirected to Google for authentication.
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <button onClick={googleLogin} className="p-2 border-2 border-black border-r-3 rounded-3xl font-medium flex gap-3 hover:bg-black hover:text-white hover:ring-4 hover:ring-white hover:ring-offset-2">
        <img width="39" height="41" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
        <p className="mt-[4px] font-bold text-xl">Sign up with Google</p></button>
    </div>
  )
}

export default Userlogin;
