import express from "express";
import { createTreatment, getTreatment, getTreatments, updateTreatment, deleteTreatment } from "../controllers/treatmentController.js";
const router = express.Router();

router.post('/', createTreatment);
router.get('/', getTreatments);
router.get('/:id', getTreatment);
router.put('/:id', updateTreatment);
router.delete('/:id', deleteTreatment);


// // Route to create a Treatment
// router.post('/', async (req, res) => {
//     try {
//         if (
//             !req.body.hiveNumber ||
//             !req.body.treatmentType ||
//             !req.body.treatmentDate

//         ) {
//             return res.status(400).send({
//                 message: "Send all required fields"
//             });
//         }

//         const newTreatment = {
//             hiveNumber: req.body.hiveNumber,
//             treatmentType: req.body.treatmentType,
//             treatmentDate: req.body.treatmentDate,

//         };
//         const treatment = await Treatment.create(newTreatment);

//         return res.status(201).send(treatment);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

// // Route to all Treatments
// router.get('/', async (req, res) => {
//     try {
//         const treatments = await Treatment.find({});

//         return res.status(200).json(treatments);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// })

// // Route for getting Treatment by ID
// router.get('/:id', async (req, res) => {
//     try {

//         const { id } = req.params;

//         const treatment = await Treatment.findById(id);

//         return res.status(200).json(treatment);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// })

// // Route to update Treatment
// router.put("/:id", async (req, res) => {
//     try {
//         if (!req.body.hiveNumber ||
//             !req.body.treatmentType ||
//             !req.body.treatmentDate

//         ) {
//             return res.status(400).send({
//                 message: "Must fill out all required fields",
//             });
//         }

//         const { id } = req.params;
//         const result = await Treatment.findByIdAndUpdate(id, req.body);

//         if (!result) {
//             return res.status(404).json({ message: 'Treatment not found' })
//         }

//         return res.status(200).send({ message: "Treatment updated Successfully" })

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

// // Route to Delete a Treatment
// router.delete("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await Treatment.findByIdAndDelete(id);

//         if (!result) {
//             return res.status(404).json({ message: "Treatment not found" });
//         }
//         return res.status(200).send({ message: "Treatment Deleted Successfully" })
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

export default router;