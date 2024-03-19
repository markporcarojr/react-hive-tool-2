import express from "express";
import { createInventory, getInventory, getInventorys, updateInventory, deleteInventory } from "../controllers/inventoryController.js"
const router = express.Router();

router.post('/', createInventory);
router.get('/', getInventorys);
router.get('/:id', getInventory);
router.put('/:id', updateInventory);
router.delete('/:id', deleteInventory);


// // Route to create inventory
// router.post('/', async (req, res) => {
//     try {
//         if (
//             !req.body.inventoryType ||
//             !req.body.inventoryAmount


//         ) {
//             return res.status(400).send({
//                 message: "Send all required fields"
//             });
//         }

//         const newInventory = {
//             inventoryType: req.body.inventoryType,
//             inventoryAmount: req.body.inventoryAmount,

//         };
//         const inventory = await Inventory.create(newInventory);

//         return res.status(201).send(inventory);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

// // Route to all Inventory
// router.get('/', async (req, res) => {
//     try {
//         const inventories = await Inventory.find({});

//         return res.status(200).json(inventories);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// })

// // Route for getting Inventory by ID
// router.get('/:id', async (req, res) => {
//     try {

//         const { id } = req.params;

//         const inventory = await Inventory.findById(id);

//         return res.status(200).json(inventory);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// })

// // Route to update Inventory
// router.put("/:id", async (req, res) => {
//     try {
//         if (!req.body.inventoryType ||
//             !req.body.inventoryAmount

//         ) {
//             return res.status(400).send({
//                 message: "Must fill out all required fields",
//             });
//         }

//         const { id } = req.params;
//         const result = await Inventory.findByIdAndUpdate(id, req.body);

//         if (!result) {
//             return res.status(404).json({ message: 'Inventory not found' })
//         }

//         return res.status(200).send({ message: "Inventory updated Successfully" })

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

// // Route to Delete a Inventory
// router.delete("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await Inventory.findByIdAndDelete(id);

//         if (!result) {
//             return res.status(404).json({ message: "Inventory not found" });
//         }
//         return res.status(200).send({ message: "Inventory Deleted Successfully" })
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

export default router;