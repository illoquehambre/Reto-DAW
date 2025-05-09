import { ISolicitud } from "./isolicitud";

export interface ISolicitudResponse extends ISolicitud {

    nombreVacante: string;
    descripcionVacante: string;
    salarioVacante: string;

    nombreUsuario: string;
    apellidoUsuario: string;
    emailUsuario: string;

    nombreEmpresa: string;
    paisEmpresa: string;
}
