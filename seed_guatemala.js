import { config } from "dotenv";
config();
import mongoose from "mongoose";
import { hash } from "argon2";

import User from "./src/users/user.model.js";
import Hotel from "./src/hotels/hotel.schema.js";
import Room from "./src/rooms/room.model.js";
import Service from "./src/services/service.model.js";
import Reservation from "./src/reservations/reservation.model.js";
import Invoice from "./src/invoices/invoice.model.js";
import Event from "./src/event/event.model.js";

async function seed() {
  try {
    console.log("Conectando a MongoDB Atlas...");
    await mongoose.connect(process.env.URI_MONGO);
    console.log("Conectado con éxito.");

    console.log("Limpiando colecciones existentes...");
    await User.deleteMany({});
    await Hotel.deleteMany({});
    await Room.deleteMany({});
    await Service.deleteMany({});
    await Reservation.deleteMany({});
    await Invoice.deleteMany({});
    await Event.deleteMany({});
    console.log("Colecciones vaciadas.");

    console.log("Creando usuarios...");
    const adminPassword = await hash("1234567");
    const managerPassword = await hash("1234567");
    const userPassword = await hash("1234567");

    const admin = await User.create({
      nombre: "Administrador General",
      email: "admin@admin.com",
      password: adminPassword,
      role: "ADMIN_ROLE",
      estado: true,
    });

    const manager1 = await User.create({
      nombre: "Carlos Morales",
      email: "carlos.morales@hotelguatemala.com",
      password: managerPassword,
      role: "MANAGER_ROLE",
      estado: true,
    });

    const manager2 = await User.create({
      nombre: "Sofía Álvarez",
      email: "sofia.alvarez@hotelguatemala.com",
      password: managerPassword,
      role: "MANAGER_ROLE",
      estado: true,
    });

    const manager3 = await User.create({
      nombre: "Mateo Castillo",
      email: "mateo.castillo@hotelguatemala.com",
      password: managerPassword,
      role: "MANAGER_ROLE",
      estado: true,
    });

    const client1 = await User.create({
      nombre: "Andrea Gómez",
      email: "andrea.gomez@gmail.com",
      password: userPassword,
      role: "USER_ROLE",
      estado: true,
    });

    const client2 = await User.create({
      nombre: "Luis Fernando Pérez",
      email: "luis.perez@gmail.com",
      password: userPassword,
      role: "USER_ROLE",
      estado: true,
    });

    console.log("Usuarios creados exitosamente.");

    console.log("Creando servicios...");
    const s1 = await Service.create({
      name: "Desayuno Buffet Típico e Internacional",
      description: "Delicioso buffet con platillos tradicionales guatemaltecos y cocina internacional",
      price: 120,
      category: "restaurant",
      available: true,
    });

    const s2 = await Service.create({
      name: "Circuito Spa Maya & Masaje Relajante",
      description: "Sesión completa de sauna, hidroterapia y masaje aromático de 60 minutos",
      price: 350,
      category: "spa",
      available: true,
    });

    const s3 = await Service.create({
      name: "Traslado Ejecutivo Aeropuerto La Aurora",
      description: "Transporte privado y seguro desde o hacia el Aeropuerto Internacional La Aurora",
      price: 180,
      category: "other",
      available: true,
    });

    const s4 = await Service.create({
      name: "Cena Romántica Colonial",
      description: "Menú degustación de 4 tiempos en terraza con vista exclusiva a los volcanes",
      price: 450,
      category: "restaurant",
      available: true,
    });

    const s5 = await Service.create({
      name: "Tour Guiado Finca de Café y Cacao",
      description: "Recorrido histórico y degustación del mejor café de altura de Antigua",
      price: 220,
      category: "event",
      available: true,
    });

    const s6 = await Service.create({
      name: "Room Service Gourmet 24 Horas",
      description: "Atención culinaria directa a la habitación a cualquier hora del día o noche",
      price: 60,
      category: "room",
      available: true,
    });

    const s7 = await Service.create({
      name: "Paseo Privado en Lancha Lago Atitlán",
      description: "Recorrido privado por los pueblos de San Juan, San Pedro y Santiago Atitlán",
      price: 500,
      category: "other",
      available: true,
    });

    const s8 = await Service.create({
      name: "Alquiler de Kayak y Paddleboard",
      description: "3 horas de equipo completo con chalecos salvavidas e instructor",
      price: 110,
      category: "other",
      available: true,
    });

    const s9 = await Service.create({
      name: "Desayuno a la Orilla del Lago",
      description: "Desayuno típico chapín servido en el muelle privado con vista a los tres volcanes",
      price: 95,
      category: "restaurant",
      available: true,
    });

    console.log("Servicios creados exitosamente.");

    console.log("Creando hoteles...");
    const hotel1 = await Hotel.create({
      name: "Grand Hotel Tikal Futura & Convention Center",
      admin: manager1._id,
      direction: "Calzada Roosevelt 22-43 Zona 11",
      location: "Ciudad de Guatemala, Guatemala",
      category: "5 Estrellas",
      facilities: [
        "Wifi",
        "Piscina",
        "Estacionamiento",
        "Parking Privado",
        "Recepción 24h",
        "Aire Acondicionado",
        "Gimnasio",
        "Spa",
        "Restaurante",
        "Bar",
        "Salas de Reuniones",
        "Servicio de Concierge"
      ],
      rangeOfPrices: { min: 650, max: 1850 },
      busyRooms: 1,
      availableRooms: 8,
      services: [s1._id, s2._id, s3._id],
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
      ],
      state: true,
    });

    const hotel2 = await Hotel.create({
      name: "Hotel Boutique & Spa Antigua Colonial",
      admin: manager2._id,
      direction: "5ta Avenida Norte No. 24, Calle del Arco",
      location: "Antigua Guatemala, Sacatepéquez",
      category: "5 Estrellas",
      facilities: [
        "Wifi",
        "Piscina",
        "Recepción 24h",
        "Spa",
        "Restaurante",
        "Bar",
        "Terraza",
        "Jardín",
        "Servicio de Limpieza",
        "Servicio de Concierge"
      ],
      rangeOfPrices: { min: 520, max: 1450 },
      busyRooms: 0,
      availableRooms: 6,
      services: [s4._id, s5._id, s6._id],
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"
      ],
      state: true,
    });

    const hotel3 = await Hotel.create({
      name: "Porta Hotel & Eco-Lodge Del Lago Atitlán",
      admin: manager3._id,
      direction: "2da Avenida 6-17 Zona 2, Playa Pública Santander",
      location: "Panajachel, Sololá, Guatemala",
      category: "4 Estrellas",
      facilities: [
        "Wifi",
        "Piscina",
        "Estacionamiento",
        "Recepción 24h",
        "Restaurante",
        "Bar",
        "Terraza",
        "Jardín",
        "Servicio de Lavandería"
      ],
      rangeOfPrices: { min: 420, max: 1200 },
      busyRooms: 1,
      availableRooms: 7,
      services: [s7._id, s8._id, s9._id],
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
      ],
      state: true,
    });

    console.log("Creando habitaciones para cada hotel...");
    // Habitaciones Hotel 1
    const r1 = await Room.create({
      type: "Habitación Deluxe Ejecutiva King",
      capacity: 2,
      price_per_night: 650,
      hotel_id: hotel1._id,
      images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80"],
      available: true,
      state: true,
    });

    const r2 = await Room.create({
      type: "Master Suite Presidencial con Vista Panorámica",
      capacity: 4,
      price_per_night: 1850,
      hotel_id: hotel1._id,
      images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"],
      available: true,
      state: true,
    });

    hotel1.rooms = [r1._id, r2._id];
    await hotel1.save();

    // Habitaciones Hotel 2
    const r3 = await Room.create({
      type: "Suite Colonial con Balcón y Chimenea",
      capacity: 2,
      price_per_night: 780,
      hotel_id: hotel2._id,
      images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80"],
      available: true,
      state: true,
    });

    const r4 = await Room.create({
      type: "Villa Colonial Familiar Imperial",
      capacity: 5,
      price_per_night: 1450,
      hotel_id: hotel2._id,
      images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"],
      available: true,
      state: true,
    });

    hotel2.rooms = [r3._id, r4._id];
    await hotel2.save();

    // Habitaciones Hotel 3
    const r5 = await Room.create({
      type: "Cabaña Panorámica Vista al Lago Atitlán",
      capacity: 2,
      price_per_night: 580,
      hotel_id: hotel3._id,
      images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80"],
      available: true,
      state: true,
    });

    const r6 = await Room.create({
      type: "Bungalow Familiar Eco-Lodge",
      capacity: 4,
      price_per_night: 1100,
      hotel_id: hotel3._id,
      images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80"],
      available: true,
      state: true,
    });

    hotel3.rooms = [r5._id, r6._id];
    await hotel3.save();

    console.log("¡Seeding completado con éxito!");
    process.exit(0);
  } catch (error) {
    console.error("Error durante el seed:", error);
    process.exit(1);
  }
}

seed();
