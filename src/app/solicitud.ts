import {IUser} from "./IUser";
import {Vacacion} from "./vacacion";

export interface Solicitud {
  id: number,
  estado: string,
  tipoSolicitud: string,
  fechaCreacion: string,
  usuario : IUser,
   vacacion: Vacacion

}
