import fs from "fs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const apiUrl = "https://randomuser.me/api";

// Función para obtener los roommates desde el archivo JSON
const getRoommatesFromJson = () => {
  const content = fs.readFileSync("./data/roommates.json", "utf8");
  return JSON.parse(content).roommates;
};

// Función para guardar los roommates en el archivo JSON
const saveRoommatesToJson = (roommates) => {
  fs.writeFileSync("./data/roommates.json", JSON.stringify({ roommates }));
};

// Función para agregar un nuevo roommate desde la API
const addRandom = async () => {
  try {
    const response = await axios.get(apiUrl);
    const randomUser = response.data.results[0];
    const id = uuidv4().slice(4, 12);
    const newRoommate = {
      id,
      name: `${randomUser.name.first} ${randomUser.name.last}`,
      email: randomUser.email,
      debe: 0,
      recibe: 0,
    };
    
    // Obtener los roommates actuales del archivo JSON
    const roommates = getRoommatesFromJson();
    
    // Agregar el nuevo roommate
    roommates.push(newRoommate);
    
    // Guardar los roommates actualizados en el archivo JSON
    saveRoommatesToJson(roommates);
    
    return newRoommate;
  } catch (error) {
    console.error("Error adding random roommate:", error.message);
    throw error;
  }
};

// Función para obtener todos los roommates
const getRandom = async () => {
  try {
    const roommates = getRoommatesFromJson();
    return { roommates };
  } catch (error) {
    console.error("Error getting random roommates:", error.message);
    throw error;
  }
};

// Función para calcular las cuentas de cada roommate
const calcularCuentas = () => {
  try {
    let { roommates } = JSON.parse(fs.readFileSync("./data/roommates.json", "utf8"));
    const { gastos } = JSON.parse(fs.readFileSync("./data/gastos.json", "utf8"));

    roommates.forEach((r) => {
      r.debe = 0;
      r.recibe = 0;
      r.total = 0;
    });

    gastos.forEach((g) => {
      const montoRoommie = g.monto / roommates.length;
      roommates.forEach((r) => {
        if (g.name === r.name) {
          r.recibe += montoRoommie * (roommates.length - 1);
        } else {
          r.debe -= montoRoommie;
        }
        r.total = r.recibe - r.debe;
      });
    });

    // Guardar los roommates actualizados en el archivo JSON
    saveRoommatesToJson(roommates);
  } catch (error) {
    console.error("Error calculating accounts:", error.message);
    throw error;
  }
};

export { addRandom, getRandom, calcularCuentas };
