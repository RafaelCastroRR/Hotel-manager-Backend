import mongoose from "mongoose";
import { hash } from "argon2";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.URI_MONGO || process.env.MONGODB_URI;

async function main() {
  console.log("Conectando a MongoDB...");
  await mongoose.connect(mongoURI);
  console.log("Conexión exitosa a MongoDB");

  const usersColl = mongoose.connection.collection("users");
  const hotelsColl = mongoose.connection.collection("hotels");
  const roomsColl = mongoose.connection.collection("rooms");

  const defaultPassword = await hash("1234567");

  // Definición de los 16 gerentes (2 por cada uno de los 8 hoteles)
  const managersData = [
    // Hotel 1: Grand Hotel Tikal Futura
    { nombre: "Carlos Morales", email: "carlos.morales@hotelguatemala.com" },
    { nombre: "Licda. Claudia Méndez", email: "claudia.mendez@tikal-futura.com" },
    
    // Hotel 2: Hotel Boutique & Spa Antigua Colonial
    { nombre: "Sofía Álvarez", email: "sofia.alvarez@hotelguatemala.com" },
    { nombre: "Diego Estrada", email: "diego.estrada@antigua-colonial.com" },

    // Hotel 3: Porta Hotel & Eco-Lodge Del Lago Atitlán
    { nombre: "Mateo Castillo", email: "mateo.castillo@hotelguatemala.com" },
    { nombre: "Lucía Herrera", email: "lucia.herrera@atitlan-lodge.com" },

    // Hotel 4: Hotel Camino Real Tikal & Reserva Ecológica
    { nombre: "Fernando Paiz", email: "fernando.paiz@caminoreal-tikal.com" },
    { nombre: "Mariana Ortiz", email: "mariana.ortiz@caminoreal-tikal.com" },

    // Hotel 5: Tortugal Eco-Resort & Marina Río Dulce
    { nombre: "Rodrigo Cifuentes", email: "rodrigo.cifuentes@tortugal-resort.com" },
    { nombre: "Valeria Ross", email: "valeria.ross@tortugal-resort.com" },

    // Hotel 6: Hotel Posada de la Montaña & Bosque Nuboso
    { nombre: "Juan Pablo Samayoa", email: "juanpablo.samayoa@posada-coban.com" },
    { nombre: "Elena Quiróz", email: "elena.quiroz@posada-coban.com" },

    // Hotel 7: Gran Hotel Colonial Pensión Bonifaz Histórico
    { nombre: "Ricardo Arjona Bonifaz", email: "ricardo.bonifaz@pension-bonifaz.com" },
    { nombre: "Gabriela Monroy", email: "gabriela.monroy@pension-bonifaz.com" },

    // Hotel 8: Resort & Villas del Pacífico Monterrico
    { nombre: "Javier Coronado", email: "javier.coronado@villas-pacifico.com" },
    { nombre: "Carmen Villagrán", email: "carmen.villagran@villas-pacifico.com" },
  ];

  console.log("Asegurando los 16 gerentes en la base de datos...");
  const managerDocs = [];
  for (const mgr of managersData) {
    let existing = await usersColl.findOne({ email: mgr.email });
    if (!existing) {
      const res = await usersColl.insertOne({
        nombre: mgr.nombre,
        email: mgr.email,
        password: defaultPassword,
        role: "MANAGER_ROLE",
        estado: true,
        createdAt: new Date(),
      });
      existing = { _id: res.insertedId, ...mgr };
      console.log(`+ Creado gerente: ${mgr.nombre} (${mgr.email})`);
    } else {
      await usersColl.updateOne(
        { _id: existing._id },
        { $set: { role: "MANAGER_ROLE", estado: true, nombre: mgr.nombre } }
      );
      console.log(`= Actualizado gerente: ${mgr.nombre}`);
    }
    managerDocs.push(existing);
  }

  // Obtener los 8 hoteles en orden
  const hotels = await hotelsColl.find({ state: true }).toArray();
  console.log(`Total de hoteles a actualizar: ${hotels.length}`);

  // Asegurar que cada hotel tenga al menos 2 habitaciones con precios exactos
  // (Para los hoteles 6, 7 y 8 que solo tenían 1 habitación)
  for (let i = 0; i < hotels.length; i++) {
    const hotel = hotels[i];
    const hotelId = hotel._id;

    // Buscar habitaciones del hotel
    let rooms = await roomsColl.find({ hotel_id: hotelId, state: true }).toArray();

    if (rooms.length < 2) {
      console.log(`Hotel '${hotel.name}' solo tiene ${rooms.length} habitación. Creando segunda habitación...`);
      let newRoomType = "Suite Deluxe Vista Panorámica";
      let newRoomPrice = 980;
      let newRoomCapacity = 3;
      let newRoomImages = [
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
      ];

      if (hotel.name.includes("Pensión Bonifaz") || hotel.name.includes("Xela")) {
        newRoomType = "Master Suite Colonial con Balcón al Parque";
        newRoomPrice = 1150;
        newRoomCapacity = 4;
      } else if (hotel.name.includes("Pacífico") || hotel.name.includes("Monterrico")) {
        newRoomType = "Villa Familiar Frente a la Playa con Piscina Privada";
        newRoomPrice = 1600;
        newRoomCapacity = 6;
      } else if (hotel.name.includes("Posada")) {
        newRoomType = "Cabaña Familiar Bosque Nuboso & Chimenea";
        newRoomPrice = 850;
        newRoomCapacity = 4;
      }

      const insertedRoom = await roomsColl.insertOne({
        type: newRoomType,
        capacity: newRoomCapacity,
        price_per_night: newRoomPrice,
        hotel_id: hotelId,
        images: newRoomImages,
        available: true,
        state: true,
        nonAvailability: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await hotelsColl.updateOne(
        { _id: hotelId },
        { $push: { rooms: insertedRoom.insertedId } }
      );
      rooms = await roomsColl.find({ hotel_id: hotelId, state: true }).toArray();
    }

    // Calcular precio mínimo EXACTO (la habitación más barata) y precio máximo EXACTO (la más cara)
    const prices = rooms.map(r => r.price_per_night).filter(p => typeof p === "number" && p > 0);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Asignar los 2 gerentes al hotel
    const primaryMgr = managerDocs[i * 2];
    const secondaryMgr = managerDocs[i * 2 + 1];
    const adminIds = [primaryMgr._id, secondaryMgr._id];

    await hotelsColl.updateOne(
      { _id: hotelId },
      {
        $set: {
          admin: primaryMgr._id,
          admins: adminIds,
          rangeOfPrices: {
            min: minPrice,
            max: maxPrice,
          },
          availableRooms: rooms.filter(r => r.available !== false).length,
        }
      }
    );

    console.log(`✅ Hotel '${hotel.name}':`);
    console.log(`   - Administradores: ${primaryMgr.nombre} y ${secondaryMgr.nombre}`);
    console.log(`   - Habitaciones: ${rooms.length}`);
    console.log(`   - Precios exactos: Min Q${minPrice} (habitación más barata) - Max Q${maxPrice}`);
  }

  console.log("\n¡Proceso completado exitosamente!");
  process.exit(0);
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
