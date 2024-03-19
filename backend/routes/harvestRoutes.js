import express from "express";
import { createHarvest, getHarvest, getHarvests, updateHarvest, deleteHarvest } from "../controllers/harvestController.js";

const router = express.Router();

router.post('/', createHarvest);
router.get('/', getHarvests);
router.get('/:id', getHarvest);
router.put('/:id', updateHarvest);
router.delete('/:id', deleteHarvest);

// // Route to create a Harvest
// router.post('/', async (req, res) => {
//     try {
//         if (
//             !req.body.harvestAmount ||
//             !req.body.harvestType ||
//             !req.body.harvestDate

//         ) {
//             return res.status(400).send({
//                 message: "Send all required fields"
//             });
//         }

//         const newHarvest = {
//             harvestAmount: req.body.harvestAmount,
//             harvestType: req.body.harvestType,
//             harvestDate: req.body.harvestDate,

//         };
//         const harvest = await Harvest.create(newHarvest);

//         return res.status(201).send(harvest);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

// // Route to all Harvests
// router.get('/', async (req, res) => {
//     try {
//         const harvests = await Harvest.find({});

//         return res.status(200).json(harvests);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// })

// // Route for getting Harvest by ID
// router.get('/:id', async (req, res) => {
//     try {

//         const { id } = req.params;

//         const harvest = await Harvest.findById(id);

//         return res.status(200).json(harvest);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// })

// // Route to update Harvest
// router.put("/:id", async (req, res) => {
//     try {
//         if (!req.body.harvestAmount ||
//             !req.body.harvestType ||
//             !req.body.harvestDate

//         ) {
//             return res.status(400).send({
//                 message: "Must fill out all required fields",
//             });
//         }

//         const { id } = req.params;
//         const result = await Harvest.findByIdAndUpdate(id, req.body);

//         if (!result) {
//             return res.status(404).json({ message: 'Harvest not found' })
//         }

//         return res.status(200).send({ message: "Harvest updated Successfully" })

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

// // Route to Delete a Harvest
// router.delete("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await Harvest.findByIdAndDelete(id);

//         if (!result) {
//             return res.status(404).json({ message: "Harvest not found" });
//         }
//         return res.status(200).send({ message: "Harvest Deleted Successfully" })
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

export default router;