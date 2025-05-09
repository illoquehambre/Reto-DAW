export interface ISolicitud {
    idSolicitud?: number;
    fecha: Date;
    archivo: string;
    comentarios: string;
    estado: number;
    curriculum: string;
    idVacante: number;
    email: string;
}
