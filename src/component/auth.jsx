import { useState } from "react";
import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


export const Auth = () => {
  // state that hold the value of the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(auth?.currentUser?.email);

  // signIn function with ordinary email
  const signIn = async () => {
    try{
    await createUserWithEmailAndPassword(auth, email, password)
  } catch(err){
    console.error(err)
  } 
  };

  // signIn function with google account
  const signInWithGoogle = async () => {
    try{
    await signInWithPopup(auth, googleProvider)
    } catch(err){
    console.error(err)
  } 
  };

  // signIn function with google account
  const logout = async () => {
    try{
    await signOut(auth)
  } catch(err){
    console.error(err)
  } 
  };


  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email..." className="mb-4 py-1"/> <br />
      <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="py-1"/><br />
      <button type="submit" onClick={signIn} className="bg-red-500 px-2 py-2 rounded-md mt-2 hover:opacity-60">Sign In</button>

      <button type="button" onClick={signInWithGoogle} className="bg-orange-500 px-2 py-2 rounded-md mt-2 ml-3 hover:opacity-50">Sign in With Google In</button>

      <button onClick={logout} className="bg-black text-white px-2 py-2 rounded-md mt-2 ml-3 hover:opacity-50">Logout</button>
    </div>
  )
}