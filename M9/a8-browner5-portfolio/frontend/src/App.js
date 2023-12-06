// Import dependencies
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import pages you have completed:
// Home, Topics, Gallery, Contact, and Staff Pages 


import MoviesPage from './pages/MoviesPage';

// For Create and Edit, use the form OR table design; not both.
// If your schema requires LONG data input, then use the FORM design:
import AddMoviePageForm from './pages/AddMoviePageForm';
import EditMoviePageForm from './pages/EditMoviePageForm';

// If your schema requires SHORT data input, then use the TABLE design.
import EditMoviePageTable from './pages/EditMoviePageTable';
import AddMoviePageTable from './pages/AddMoviePageTable';

// Define the function that renders the content in Routes, using State.
function App() {

  const [movie, setMovieToEdit] = useState([])

  return (
    <>
      <BrowserRouter>

          <header>
            <h1>Portfolio</h1>
            <p>Describe this website.</p>
          </header>

          <Navigation />

          <main>
            <section>
                <Routes> 
                    {/* Add Routes for Home, Topics, Gallery, Contact, and Staff Pages.  */}
                    
                    <Route path="/" element={<MoviesPage setMovie={setMovieToEdit}/>} />
                 
                    {/* Use these if your schema requires LONG data input: */}
                    <Route path="/create" element={<AddMoviePageTable />} /> 
                    <Route path="/update" element={<EditMoviePageTable movieToEdit={movie} />} />

                    {/* Or these if your schema requires SHORT data input: */}
                     <Route path="/create" element={<AddMoviePageForm />} />   
                     <Route path="/update" element={<EditMoviePageForm movieToEdit={movie} />} />
                </Routes>
              </section>
          </main>

          <footer>
            <p>Copyright statement</p>
          </footer>

      </BrowserRouter>
    </>
  );
}

export default App;