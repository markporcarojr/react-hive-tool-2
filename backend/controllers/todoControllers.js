import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
    try {
        const { todo, userId } = req.body;
        if (
            !todo

        ) {
            return res.status(400).send({
                message: "Fill out all required fields"
            });
        }

        const newtodo = {
            todo,
            userId


        };
        const todoData = await Todo.create(newtodo);

        return res.status(201).send(todoData);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
}
export const getTodos = async (req, res) => {
    try {
        const userId = req.query.userId;
        const todos = await Todo.find({ userId });

        return res.status(200).json(todos);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}
export const getTodo = async (req, res) => {
    try {

        const { id } = req.params;

        const todo = await todo.findById(id);

        return res.status(200).json(todo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}
export const updateTodo = async (req, res) => {
    try {
        if (!req.body.todo

        ) {
            return res.status(400).send({
                message: "Fill out the form",
            });
        }

        const { id } = req.params;
        const result = await Todo.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Todo not found' })
        }

        return res.status(200).send({ message: "Todo updated Successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
}
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Todo.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).send({ message: "Todo Deleted Successfully" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
}