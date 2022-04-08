import { Clientes } from "../clientes/Clientes";
import { Pageable } from "../core/model/page/Pageable_p";
import { Prestamos } from "./Prestamos";

export class PrestamosPage {
   
    content: Prestamos[];
    pageable: Pageable;
    totalElements: number;
}
