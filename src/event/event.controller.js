import Event from "./event.model.js";
import Hotel from "../hotels/hotel.schema.js";

// Crear evento (inicia como PENDIENTE de aprobación por el gerente)
export const crearEvento = async (req, res) => {
  try {
    const { hotelId } = req.params;
    let { 
      nombre_evento, 
      name,
      descripcion, 
      description,
      fecha, 
      date,
      recursos_asignados, 
      assignedResources,
      servicios_adicionales, 
      additionalServices,
      tipo_evento, 
      type,
      images, 
      hotel_id,
      hotel: bodyHotel
    } = req.body;

    const targetHotelId = hotelId || hotel_id || bodyHotel;

    if (!targetHotelId) {
      return res.status(400).json({ message: "El ID del hotel es requerido" });
    }

    // Validar que el hotel exista
    const hotel = await Hotel.findById(targetHotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }

    const eventDate = fecha || date;
    if (!eventDate) {
      return res.status(400).json({ message: "La fecha del evento es obligatoria" });
    }

    const fechaEvento = new Date(eventDate);
    if (isNaN(fechaEvento.getTime())) {
      return res.status(400).json({ message: "Formato de fecha inválido" });
    }

    const finalRecursos = Array.isArray(recursos_asignados) 
      ? recursos_asignados 
      : (Array.isArray(assignedResources) ? assignedResources : []);

    const finalServicios = Array.isArray(servicios_adicionales) 
      ? servicios_adicionales 
      : (Array.isArray(additionalServices) ? additionalServices : []);

    const user = req.user._id;
    const nuevoEvento = new Event({
      nombre_evento: nombre_evento || name || "Evento especial",
      descripcion: descripcion || description || "Evento especial",
      fecha: fechaEvento,
      user,
      hotel_id: targetHotelId,
      recursos_asignados: finalRecursos,
      servicios_adicionales: finalServicios,
      tipo_evento: tipo_evento || type || "General",
      images: Array.isArray(images) ? images : [],
      aprobacion: "PENDIENTE",
      estado: true
    });

    await nuevoEvento.save();

    const eventoCreado = await Event.findById(nuevoEvento._id)
      .populate("hotel_id", "name direction location images")
      .populate("user", "nombre name email");

    res.status(201).json(eventoCreado || nuevoEvento);
  } catch (error) {
    console.error("Error al crear el evento:", error);
    res.status(500).json({ message: "Error al crear el evento", error: error.message });
  }
};

// Listar eventos por hotel (para el gerente del hotel)
export const listarEventosPorHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { fecha, tipo_evento, aprobacion } = req.query;

    const filtros = { hotel_id: hotelId };

    if (fecha) {
      filtros.fecha = { $gte: new Date(fecha) };
    }

    if (tipo_evento) {
      filtros.tipo_evento = tipo_evento;
    }

    if (aprobacion) {
      filtros.aprobacion = aprobacion;
    }

    const eventos = await Event.find(filtros)
      .populate("user", "nombre name email")
      .populate("hotel_id", "name direction location images")
      .sort({ fecha: 1 });

    res.json(eventos);
  } catch (error) {
    console.error("Error al listar eventos:", error);
    res.status(500).json({ message: "Error al listar eventos", error: error.message });
  }
};

// Cambiar estado de aprobación del evento (exclusivo para Manager / Admin)
export const cambiarAprobacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { aprobacion } = req.body; // "APROBADO", "RECHAZADO", "PENDIENTE"

    if (!["PENDIENTE", "APROBADO", "RECHAZADO"].includes(aprobacion)) {
      return res.status(400).json({ message: "Estado de aprobación no válido. Debe ser PENDIENTE, APROBADO o RECHAZADO." });
    }

    const evento = await Event.findByIdAndUpdate(
      id,
      { aprobacion },
      { new: true }
    )
      .populate("user", "nombre name email")
      .populate("hotel_id", "name direction location images");

    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.json({
      message: `El evento ha sido ${aprobacion === "APROBADO" ? "aprobado" : aprobacion === "RECHAZADO" ? "rechazado" : "marcado como pendiente"} exitosamente.`,
      evento
    });
  } catch (error) {
    console.error("Error al actualizar aprobación:", error);
    res.status(500).json({ message: "Error al actualizar estado de aprobación", error: error.message });
  }
};

// Obtener detalle del evento
export const obtenerEventoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Event.findById(id)
      .populate("user", "nombre name email")
      .populate("hotel_id", "name direction location images");

    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.json(evento);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el evento", error: error.message });
  }
};

// Editar evento
export const editarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const evento = await Event.findByIdAndUpdate(id, data, { new: true })
      .populate("user", "nombre name email")
      .populate("hotel_id", "name direction location images");

    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.json(evento);
  } catch (error) {
    res.status(500).json({ message: "Error al editar el evento", error: error.message });
  }
};

// Cancelar evento
export const cancelarEvento = async (req, res) => {
  try {
    const { id } = req.params;

    const evento = await Event.findByIdAndUpdate(id, { estado: false }, { new: true });

    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.json({ message: "Evento cancelado", evento });
  } catch (error) {
    res.status(500).json({ message: "Error al cancelar el evento", error: error.message });
  }
};

// Mis eventos (para el usuario cliente autenticado)
export const misEventos = async (req, res) => {
  try {
    const user = req.user._id;
    const events = await Event.find({ user })
      .populate("hotel_id", "name direction location images")
      .populate("user", "nombre name email")
      .sort({ fecha: 1 });

    res.status(200).json({
      message: "Eventos obtenidos exitosamente",
      events
    });
  } catch (error) {
    console.error("Error al obtener mis eventos:", error);
    res.status(500).json({ message: "Error al obtener eventos", error: error.message });
  }
};
