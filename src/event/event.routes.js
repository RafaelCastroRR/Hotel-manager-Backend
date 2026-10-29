import { Router } from "express";
import {
  crearEvento,
  listarEventosPorHotel,
  obtenerEventoPorId,
  editarEvento,
  cancelarEvento,
  misEventos,
  cambiarAprobacion,
} from "./event.controller.js";
import { validarJWT } from "../middlewares/validar-JWT.js";

const router = Router();

// Eventos del usuario autenticado
router.get("/my-events", validarJWT, misEventos);

// Crear evento para un hotel (inicia como PENDIENTE)
router.post("/hotels/:hotelId/events", validarJWT, crearEvento);

// Listar eventos de un hotel
router.get("/hotels/:hotelId/events", listarEventosPorHotel);

// Cambiar estado de aprobación (APROBADO, RECHAZADO, PENDIENTE) por el Manager
router.patch("/:id/approval", validarJWT, cambiarAprobacion);

// Ver detalle
router.get("/:id", obtenerEventoPorId);

// Editar evento
router.put("/:id", editarEvento);

// Cancelar evento
router.delete("/:id", cancelarEvento);

export default router;
