import { IVacante } from "./ivacante";

export interface IVacanteResponse extends IVacante  {

    nombreCategoria: string;

    nombreEmpresa: string;
    pais: string;
  }