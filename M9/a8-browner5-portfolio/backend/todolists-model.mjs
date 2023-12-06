// Models for the Todolist Collection

// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ Error: '500 Internal Service Error (The server has encountered a situation it does not know how to handle).' });
    } else  {
        console.log('Successfully connected to MongoDB using Mongoose!');
    }
});

// SCHEMA: Define the collection's schema.
const todolistSchema = mongoose.Schema({
	name:    { type: String, required: true },
	militarytime:     { type: Number, required: true },
    description: { type: String, required: true },
    datetodo: { type: Date, required: true },
    iscompleted: { type: Boolean, required: true }
});

// Compile the model from the schema 
// by defining the collection name "todolists".
const todolists = mongoose.model('todolists', todolistSchema);


// CREATE model *****************************************
const createTodolists = async (name, militarytime, description, datetodo, iscompleted) => {
    const todolist = new todolists({ 
        name: name, 
        militarytime: militarytime, 
        description: description,
        datetodo: datetodo,
        iscompleted: iscompleted
    });
    return todolist.save();
}


// RETRIEVE model *****************************************
// Retrieve all documents and return a promise.
const retrieveTodolists = async () => {
    const query = todolists.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveTodolistByID = async (_id) => {
    const query = todolists.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteTodolistById = async (_id) => {
    const result = await todolists.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateTodolist = async (_id, name, militarytime, description, datetodo, iscompleted) => {
    const result = await todolists.replaceOne({_id: _id }, {
        name: name,
        militarytime: militarytime,
        description: description,
        datetodo: datetodo,
        iscompleted: iscompleted
    });
    return { 
        _id: _id, 
        name: name,
        militarytime: militarytime,
        description: description,
        datetodo: datetodo,
        iscompleted: iscompleted
    }
}

// EXPORT the variables for use in the controller file.
export { createTodolists, retrieveTodolists, retrieveTodolistByID, updateTodolist, deleteTodolistById }