import express from "express";
import { createHive, getHive, getHives, updateHive, deleteHive } from "../controllers/hiveController.js";

const router = express.Router();

router.post('/', createHive);
router.get('/', getHives);
router.get('/:id', getHive);
router.put('/:id', updateHive);
router.delete('/:id', deleteHive);

// // Route to create a hive
// router.post('/', async (req, res) => {
//     try {
//         if (
//             !req.body.hiveNumber ||
//             !req.body.breed ||
//             !req.body.hiveStrength ||
//             !req.body.hiveDate

//         ) {
//             return res.status(400).send({
//                 message: "Send all required fields"
//             });
//         }

//         const newHive = {
//             hiveNumber: req.body.hiveNumber,
//             breed: req.body.breed,
//             hiveStrength: req.body.hiveStrength,
//             hiveDate: req.body.hiveDate,

//         };
//         const hive = await Hive.create(newHive);

//         return res.status(201).send(hive);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

// // Route to all hives
// router.get('/', async (req, res) => {
//     try {
//         const hives = await Hive.find({});

//         return res.status(200).json(hives);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// })

// // Route for getting hive by ID
// router.get('/:id', async (req, res) => {
//     try {

//         const { id } = req.params;

//         const hive = await Hive.findById(id);

//         return res.status(200).json(hive);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// })

// // Route to update Hive
// router.put("/:id", async (req, res) => {
//     try {
//         if (!req.body.hiveNumber ||
//             !req.body.breed ||
//             !req.body.hiveStrength ||
//             !req.body.hiveDate

//         ) {
//             return res.status(400).send({
//                 message: "Must fill out all required fields",
//             });
//         }

//         const { id } = req.params;
//         const result = await Hive.findByIdAndUpdate(id, req.body);

//         if (!result) {
//             return res.status(404).json({ message: 'Hive not found' })
//         }

//         return res.status(200).send({ message: "Hive updated Successfully" })

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

// // Route to Delete a hive
// router.delete("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await Hive.findByIdAndDelete(id);

//         if (!result) {
//             return res.status(404).json({ message: "Hive not found" });
//         }
//         return res.status(200).send({ message: "Hive Deleted Successfully" })
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

export default router;