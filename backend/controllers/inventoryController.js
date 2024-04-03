import { Inventory } from "../models/inventory.js";

export const createInventory = async (req, res) => {
    try {
        if (
            !req.body.inventoryType ||
            !req.body.inventoryAmount


        ) {
            return res.status(400).send({
                message: "Fill out all required fields"
            });
        }

        const newInventory = {
            inventoryType: req.body.inventoryType,
            inventoryAmount: req.body.inventoryAmount,

        };
        const inventory = await Inventory.create(newInventory);

        return res.status(201).send(inventory);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
}
export const getInventorys = async (req, res) => {
    try {
        const inventories = await Inventory.find({});

        return res.status(200).json(inventories);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}
export const getInventory = async (req, res) => {
    try {

        const { id } = req.params;

        const inventory = await Inventory.findById(id);

        return res.status(200).json(inventory);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}
export const updateInventory = async (req, res) => {
    try {
        if (!req.body.inventoryType ||
            !req.body.inventoryAmount

        ) {
            return res.status(400).send({
                message: "Fill out all required fields",
            });
        }

        const { id } = req.params;
        const result = await Inventory.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Inventory not found' })
        }

        return res.status(200).send({ message: "Inventory updated Successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
}
export const deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Inventory.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        return res.status(200).send({ message: "Inventory Deleted Successfully" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
}