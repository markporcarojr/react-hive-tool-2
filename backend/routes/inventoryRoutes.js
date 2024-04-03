import express from "express";
import { createInventory, getInventory, getInventorys, updateInventory, deleteInventory } from "../controllers/inventoryController.js"
const router = express.Router();

router.post('/', createInventory);
router.get('/', getInventorys);
router.get('/:id', getInventory);
router.put('/:id', updateInventory);
router.delete('/:id', deleteInventory);


export default router;