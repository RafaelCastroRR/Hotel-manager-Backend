import { Schema, model } from "mongoose";

const EventSchema = new Schema(
  {
    nombre_evento: {
      type: String,
      required: [true, "El nombre del evento es obligatorio"],
      trim: true,
    },
    descripcion: {
      type: String,
      default: "",
    },
    fecha: {
      type: Date,
      required: [true, "La fecha del evento es obligatoria"],
      validate: {
        validator: function (value) {
          if (!value) return false;
          // Permitir fecha de hoy o futura con 4 horas de margen por diferencias de timezone
          return new Date(value).getTime() >= (Date.now() - 4 * 3600 * 1000);
        },
        message: "La fecha del evento debe ser actual o futura",
      },
    },
    hotel_id: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: [true, "El hotel es obligatorio"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El usuario es obligatorio"],
    },
    recursos_asignados: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    servicios_adicionales: {
      type: [String],
      default: [],
    },
    tipo_evento: {
      type: String,
      default: "General",
    },
    aprobacion: {
      type: String,
      enum: ["PENDIENTE", "APROBADO", "RECHAZADO"],
      default: "PENDIENTE",
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

EventSchema.methods.toJSON = function () {
  const { __v, _id, ...evento } = this.toObject();
  evento._id = _id;
  evento.uid = _id;
  return evento;
};

export default model("event", EventSchema);
