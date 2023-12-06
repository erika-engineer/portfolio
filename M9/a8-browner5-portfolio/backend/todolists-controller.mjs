// Controllers for the Todolist Collection

import 'dotenv/config';
import express from 'express';
import * as todolists from './todolists-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/todolists', (req,res) => { 
    todolists.createTodolists(
        req.body.name, 
        req.body.militarytime,
        req.body.description,
        req.body.datetodo,
        req.body.iscompleted
        )
        .then(todolist => {
            console.log(`"${todolist.name}" was added to the collection.`);
            res.status(201).json(todolist);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'POST: 400 Bad Request (Client causing Server Error).' });
        });
});


// RETRIEVE controller ****************************************************
app.get('/todolists', (req, res) => {
    todolists.retrieveTodolists()
        .then(todolists => { 
            if (todolists !== null) {
                console.log(`All todolists were retrieved from the collection.`);
                res.json(todolists);
            } else {
                res.status(404).json({ Error: 'GET: 404 Not Found (Requested Resource cannot be found).' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'GET: 400 Bad Request (Client causing Server Error).' });
        });
});


// RETRIEVE by ID controller
app.get('/todolists/:_id', (req, res) => {
    todolists.retrieveTodolistByID(req.params._id)
    .then(todolist => { 
        if (todolist !== null) {
            console.log(`"${todolist.name}" was retrieved, based on its ID.`);
            res.json(todolist);
        } else {
            res.status(404).json({ Error: 'GET by ID: 404 Not Found (Requested Resource cannot be found).'});
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'GET by ID: 400 Bad Request (Client causing Server Error).' });
    });

});


// UPDATE controller ************************************
app.put('/todolists/:_id', (req, res) => {
    todolists.updateTodolist(
        req.params._id, 
        req.body.name, 
        req.body.militarytime, 
        req.body.description,
        req.body.datetodo,
        req.body.iscompleted
    )
    .then(todolist => {
        console.log(`"${todolist.name}" was updated.`);
        res.json(todolist);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'PUT: 400 Bad Request (Client causing Server Error).' });
    });
});


// DELETE Controller ******************************
app.delete('/todolists/:_id', (req, res) => {
    todolists.deleteTodolistById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, ${deletedCount} todolist was deleted.`);
                res.status(200).send({ Success: '200 OK: The DELETE request succeeded.'});
            } else {
                res.status(404).json({ Error: 'DELETE: 404 Not Found (Requested Resource cannot be found).' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'DELETE: .catch error!' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});