export interface ISolicitud {
<<<<<<< HEAD
    idSolicitud: number;
    fecha: string;          
    archivo: string;
    comentarios: string;
    estado: number;
  }
=======
    idSolicitud?: number;
    fecha: Date;
    archivo: string;
    comentarios: string;
    estado: number;
    curriculum: string;
    idVacante: number;
    email: string;
}
>>>>>>> versionArreglada
