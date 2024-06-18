import express from "express";
const router = express.Router();
import path from "path";
const __dirname = import.meta.dirname;
import { addRoommate, getRoommates} from "../controllers/roommates.js";
import { addGasto, getGastos, editarGasto, borrarGasto} from "../controllers/gastos.js";

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

//rutas para agregar y ver roommates
router.post("/roommate", addRoommate );//
router.get("/roommates", getRoommates);//

//gastos
router.get("/gastos",getGastos);//
router.post("/gasto",addGasto);//
router.put("/gasto", editarGasto);
router.delete("/gasto",borrarGasto)

export default router;