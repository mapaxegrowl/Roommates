import { addCuenta, getCuenta, editCuenta, borrarCuenta } from "../queries/cuentas.js";
import { calcularCuentas } from "../queries/rommies.js";

const addGasto = async (req, res) => {
  try {
    const result = await addCuenta(req, res);
    await calcularCuentas();
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getGastos = async (req, res) => {
  try {
    const resp = await getCuenta(); //
    res.json(resp);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editarGasto = async (req, res) => {
  const {name, descripcion, monto } = req.body;
  const {id}=req.query;
  console.log(req.body)
  try {
    console.log(id,name, descripcion, monto)
    const result = await editCuenta(id,name, descripcion, monto);
    console.log(result)
    await calcularCuentas();
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const borrarGasto=async (req,res)=>{
  const {id}=req.query;
  console.log(id)
try{
  await borrarCuenta(id);
  await calcularCuentas();
  res.status(200).send("Gasto eliminado correctamente" );
}catch(error){
  res.status(500).send(error.message);
}
}

export { addGasto, getGastos, editarGasto, borrarGasto };