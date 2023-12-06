import React from 'react';
import Movie from './Movie';

// Change the function names and parameters 
// to fit your portfolio topic and schema.

function MovieList({ movies, onDelete, onEdit }) {
    return (
        <table id="movies">
            <caption>Add and Edit Movies</caption>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Language</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie, i) => 
                    <Movie 
                        movie={movie} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </tbody>
        </table>
    );
}

export default MovieList;
