import { useEffect, useState } from 'react';
import { Auth } from './component/auth';
import { db, auth, storage } from './config/firebase';
import  { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytes } from 'firebase/storage';


function App() {
 const [movieList, setMovieList] = useState([]);

//  New movie State
const [newMovie, setNewMovie] = useState("");
const [newReleaseDate, setNewReleaseDate] = useState(0);
const [isOscaRelease, setIsOscRelease] = useState(false);

// Update title state
const [updatedTitle, setUpdatedTitle] = useState("");

// file upload state
const [fileUpload, setFileUpload] = useState(null);

 const movieCollectionRef = collection(db, "movies");

 const getMovieList = async () => {
  //  Read ther data from the database
      try{
        const data = await getDocs(movieCollectionRef);
        const filteredDocs = data.docs.map((doc) => ({
          ...doc.data(), id: doc.id, 
        }));
        setMovieList(filteredDocs)
      } catch (err) {
        console.error(err)
      }
 }

//  usetEffect hooks
useEffect(() => {
    getMovieList();
  }, []);

  // delete function
  const deleteMovie = async (id) => {
         const movieDoc = doc(db, "movies", id)
        await deleteDoc(movieDoc)   
  };

  // updateTitle
  const updateMovieTitle = async (id) => {
         const movieDoc = doc(db, "movies", id)
        await updateDoc(movieDoc, {title: updatedTitle})   
  }
  
  // submit 
  const onSubmitEvent = async () => {
       try{
         await addDoc(movieCollectionRef, {
           title: newMovie,
          releaseDate: newReleaseDate,
          receiveAndOsca: isOscaRelease,
          userId: auth?.currentUser?.uid,
        });
        
        // getMovieLsit();
       } catch (err) {
        console.log(err)
       }
    };

    // Function to handle file upload
const uploadFiles = async () => {
  if(!fileUpload) return;
  const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
  try {
    await uploadBytes(fileFolderRef, fileUpload);
  } catch(err) {
    console.error(err)
  }
};


  return (
    <>
      <div className='flex items-center justify-center flex-col bg-blue-800 h-screen'>
          <h1 className='font-medium'>Firebase course</h1>
          <Auth />
          <input className='mb-3 mt-3' type="text" placeholder='movies title...' onChange={(e) => setNewMovie(e.target.value)} />

          <input type="number" placeholder='Release date...' onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>

          <label htmlFor="osca">Received an osca</label>
          <input type="checkbox" checked={isOscaRelease} onChange={(e) => setIsOscRelease(e.target.checked)}/>

           <button className='bg-cyan-600 p-2 rounded-md my-2 hover:opacity-30' onClick={onSubmitEvent}>submit</button>
          {
            movieList.map((movie) => (
                            <div>
                            <h1 className='text-3xl' style={{color: movie.receiveAndOsca ? 'white' : 'orange'}}>{movie.title}</h1>
                            <h3>Date: {movie.releaseDate}</h3>
                          <button className='bg-red-600 p-2 rounded-md my-2 hover:opacity-30' onClick={() => deleteMovie(movie.id)}>delete</button>
                            <br />
                              <input type="text" placeholder='update title...' onChange={(e) => setUpdatedTitle(e.target.value)}/>
                              <button className='bg-pink-600 p-2' onClick={()=> updateMovieTitle(movie.id)}>
                                Update title
                                </button>
                              </div>
                 ))}
              <div>
               <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
               <button onClick={uploadFiles} className='bg-yellow-600 p-2'> Upload File</button>
              </div>
           </div>
    </>
  );
}

export default App
