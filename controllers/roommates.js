import { addRandom, getRandom, calcularCuentas } from "../queries/rommies.js";

//agregar 
const addRoommate=async (req,res)=>{
try{
    await addRandom();
    await calcularCuentas();
    res.redirect("/");
}catch(error){
res.status(500).send(error.message)
}
};

const getRoommates=async(req,res)=>{
try{
        const resp= await getRandom(); //
        res.json(resp);
    }catch(error){
        res.status(500).send(error.message)
    }
};

export {addRoommate, getRoommates}