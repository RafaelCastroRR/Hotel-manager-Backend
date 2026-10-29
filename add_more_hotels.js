import { config } from "dotenv";
config();
import mongoose from "mongoose";

import User from "./src/users/user.model.js";
import Hotel from "./src/hotels/hotel.schema.js";
import Room from "./src/rooms/room.model.js";
import Service from "./src/services/service.model.js";

async function addMoreHotels() {
  try {
    console.log("Conectando a MongoDB Atlas...");
    await mongoose.connect(process.env.URI_MONGO);
    console.log("Conectado con éxito.");

    // Obtener los managers existentes sin tocar usuarios
    const manager1 = await User.findOne({ email: "carlos.morales@hotelguatemala.com" });
    const manager2 = await User.findOne({ email: "sofia.alvarez@hotelguatemala.com" });
    const manager3 = await User.findOne({ email: "mateo.castillo@hotelguatemala.com" });

    if (!manager1 || !manager2 || !manager3) {
      throw new Error("No se encontraron los managers existentes.");
    }

    console.log("Creando nuevos servicios...");

    // Servicios Petén
    const s_tikal_1 = await Service.create({
      name: "Tour Arqueológico Tikal al Amanecer",
      description: "Recorrido privado guiado en el Parque Nacional Tikal para ver el amanecer desde el Templo IV",
      price: 450,
      category: "event",
      available: true,
    });
    const s_tikal_2 = await Service.create({
      name: "Paseo en Lancha al Atardecer Lago Petén Itzá",
      description: "Recorrido escénico con bebidas típicas y parada en la Isla de Flores",
      price: 320,
      category: "other",
      available: true,
    });
    const s_tikal_3 = await Service.create({
      name: "Desayuno Selvático Buffet",
      description: "Variedad de frutas tropicales de Petén, huevos al gusto y pan recién horneado",
      price: 110,
      category: "restaurant",
      available: true,
    });

    // Servicios Río Dulce
    const s_rio_1 = await Service.create({
      name: "Excursión en Yate hacia el Castillo de San Felipe",
      description: "Paseo navegando las aguas del Río Dulce visitando el fuerte colonial español",
      price: 380,
      category: "other",
      available: true,
    });
    const s_rio_2 = await Service.create({
      name: "Tour a Siete Altares y Livingston",
      description: "Aventura acuática hacia cascadas naturales y almuerzo con tapado caribeño",
      price: 420,
      category: "event",
      available: true,
    });
    const s_rio_3 = await Service.create({
      name: "Alquiler de Kayak por los Manglares",
      description: "Equipo completo para explorar los canales y avistar aves tropicales",
      price: 90,
      category: "other",
      available: true,
    });

    // Servicios Semuc Champey / Cobán
    const s_coban_1 = await Service.create({
      name: "Expedición Semuc Champey y Cuevas de K'anba",
      description: "Pozas color turquesa, recorrido en cuevas con velas y tubbing en el río Cahabón",
      price: 390,
      category: "event",
      available: true,
    });
    const s_coban_2 = await Service.create({
      name: "Cena Tradicional con Kak'ik Maya Q'eqchi'",
      description: "Platillo ancestral declarado patrimonio cultural, servido con tamalitos de masa",
      price: 135,
      category: "restaurant",
      available: true,
    });
    const s_coban_3 = await Service.create({
      name: "Senderismo Guiado Ruta del Quetzal",
      description: "Caminata matutina por el bosque nuboso para avistar el ave nacional",
      price: 250,
      category: "other",
      available: true,
    });

    // Servicios Quetzaltenango (Xela)
    const s_xela_1 = await Service.create({
      name: "Tour a las Fuentes Georginas y Aguas Termales",
      description: "Baños de vapor y piscinas volcánicas termales en medio de la neblina de Zunil",
      price: 280,
      category: "spa",
      available: true,
    });
    const s_xela_2 = await Service.create({
      name: "Cafetería y Repostería Tradicional Quetzalteca",
      description: "Degustación de chocolate caliente artesanal y shecas de Xela",
      price: 65,
      category: "restaurant",
      available: true,
    });

    // Servicios Monterrico
    const s_monte_1 = await Service.create({
      name: "Liberación Guiada de Tortugas Marinas",
      description: "Experiencia ecoturística en el tortugario y playa al atardecer",
      price: 150,
      category: "event",
      available: true,
    });
    const s_monte_2 = await Service.create({
      name: "Parrillada de Mariscos Frescos Frente al Mar",
      description: "Langosta, camarones gigantes y pescado fresco del Pacífico a la parrilla",
      price: 360,
      category: "restaurant",
      available: true,
    });

    console.log("Servicios creados con éxito. Creando hoteles...");

    // 1. Hotel Petén
    const hotelPeten = await Hotel.create({
      name: "Hotel Camino Real Tikal & Reserva Ecológica",
      admin: manager1._id,
      direction: "Km 18 Carretera a Tikal, Aldea El Remate",
      location: "Flores, Petén, Guatemala",
      category: "5 Estrellas",
      facilities: [
        "Wifi",
        "Piscina",
        "Estacionamiento",
        "Parking Privado",
        "Recepción 24h",
        "Aire Acondicionado",
        "Restaurante",
        "Bar",
        "Terraza",
        "Jardín",
        "Servicio de Concierge"
      ],
      rangeOfPrices: { min: 720, max: 2100 },
      busyRooms: 2,
      availableRooms: 8,
      services: [s_tikal_1._id, s_tikal_2._id, s_tikal_3._id],
      images: [
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
      ],
      state: true,
    });

    // 2. Hotel Río Dulce
    const hotelRioDulce = await Hotel.create({
      name: "Tortugal Eco-Resort & Marina Río Dulce",
      admin: manager2._id,
      direction: "Bahía de San Felipe, Frontera Río Dulce",
      location: "Livingston, Izabal, Guatemala",
      category: "4 Estrellas",
      facilities: [
        "Wifi",
        "Piscina",
        "Restaurante",
        "Bar",
        "Terraza",
        "Jardín",
        "Parking Privado",
        "Servicio de Concierge"
      ],
      rangeOfPrices: { min: 480, max: 1350 },
      busyRooms: 1,
      availableRooms: 6,
      services: [s_rio_1._id, s_rio_2._id, s_rio_3._id],
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
      ],
      state: true,
    });

    // 3. Hotel Cobán / Semuc Champey
    const hotelCoban = await Hotel.create({
      name: "Hotel Posada de la Montaña & Bosque Nuboso",
      admin: manager3._id,
      direction: "Km 215 Carretera hacia Semuc Champey",
      location: "Cobán, Alta Verapaz, Guatemala",
      category: "4 Estrellas",
      facilities: [
        "Wifi",
        "Estacionamiento",
        "Recepción 24h",
        "Calefacción",
        "Restaurante",
        "Bar",
        "Jardín",
        "Servicio de Lavandería"
      ],
      rangeOfPrices: { min: 380, max: 980 },
      busyRooms: 0,
      availableRooms: 7,
      services: [s_coban_1._id, s_coban_2._id, s_coban_3._id],
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
      ],
      state: true,
    });

    // 4. Hotel Xela
    const hotelXela = await Hotel.create({
      name: "Gran Hotel Colonial Pensión Bonifaz Histórico",
      admin: manager1._id,
      direction: "4ta Calle 10-50 Zona 1, Frente a Parque Centroamérica",
      location: "Quetzaltenango (Xela), Guatemala",
      category: "4 Estrellas",
      facilities: [
        "Wifi",
        "Estacionamiento",
        "Parking Privado",
        "Recepción 24h",
        "Calefacción",
        "Restaurante",
        "Bar",
        "Salas de Reuniones",
        "Servicio de Limpieza"
      ],
      rangeOfPrices: { min: 450, max: 1150 },
      busyRooms: 1,
      availableRooms: 8,
      services: [s_xela_1._id, s_xela_2._id],
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
      ],
      state: true,
    });

    // 5. Hotel Monterrico
    const hotelMonterrico = await Hotel.create({
      name: "Resort & Villas del Pacífico Monterrico",
      admin: manager2._id,
      direction: "Calle Principal Playa Monterrico, Frente al Mar",
      location: "Monterrico, Santa Rosa, Guatemala",
      category: "4 Estrellas",
      facilities: [
        "Wifi",
        "Piscina",
        "Estacionamiento",
        "Aire Acondicionado",
        "Restaurante",
        "Bar",
        "Terraza",
        "Habitaciones Privadas"
      ],
      rangeOfPrices: { min: 550, max: 1600 },
      busyRooms: 2,
      availableRooms: 6,
      services: [s_monte_1._id, s_monte_2._id],
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
      ],
      state: true,
    });

    console.log("Hoteles creados. Creando habitaciones...");

    // Habitaciones Petén
    const r_tikal_1 = await Room.create({
      type: "Master Suite Vista Lago Petén Itzá",
      capacity: 2,
      price_per_night: 850,
      hotel_id: hotelPeten._id,
      images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"],
      available: true,
      state: true,
    });
    const r_tikal_2 = await Room.create({
      type: "Cabaña Selva Maya Familiar",
      capacity: 4,
      price_per_night: 1400,
      hotel_id: hotelPeten._id,
      images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80"],
      available: true,
      state: true,
    });
    hotelPeten.rooms = [r_tikal_1._id, r_tikal_2._id];
    await hotelPeten.save();

    // Habitaciones Río Dulce
    const r_rio_1 = await Room.create({
      type: "Bungalow Sobre el Agua Río Dulce",
      capacity: 2,
      price_per_night: 750,
      hotel_id: hotelRioDulce._id,
      images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80"],
      available: true,
      state: true,
    });
    const r_rio_2 = await Room.create({
      type: "Villa Familiar Marina Caribeña",
      capacity: 5,
      price_per_night: 1350,
      hotel_id: hotelRioDulce._id,
      images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"],
      available: true,
      state: true,
    });
    hotelRioDulce.rooms = [r_rio_1._id, r_rio_2._id];
    await hotelRioDulce.save();

    // Habitaciones Cobán
    const r_coban_1 = await Room.create({
      type: "Cabaña de Montaña con Chimenea de Leña",
      capacity: 2,
      price_per_night: 480,
      hotel_id: hotelCoban._id,
      images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80"],
      available: true,
      state: true,
    });
    hotelCoban.rooms = [r_coban_1._id];
    await hotelCoban.save();

    // Habitaciones Xela
    const r_xela_1 = await Room.create({
      type: "Habitación Colonial Tradicional Quetzalteca",
      capacity: 2,
      price_per_night: 520,
      hotel_id: hotelXela._id,
      images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80"],
      available: true,
      state: true,
    });
    hotelXela.rooms = [r_xela_1._id];
    await hotelXela.save();

    // Habitaciones Monterrico
    const r_monte_1 = await Room.create({
      type: "Villa Frente al Océano con Hamacas y Balcón",
      capacity: 4,
      price_per_night: 950,
      hotel_id: hotelMonterrico._id,
      images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80"],
      available: true,
      state: true,
    });
    hotelMonterrico.rooms = [r_monte_1._id];
    await hotelMonterrico.save();

    console.log("¡5 nuevos hoteles agregados exitosamente!");
    process.exit(0);
  } catch (err) {
    console.error("Error al agregar hoteles:", err);
    process.exit(1);
  }
}

addMoreHotels();
