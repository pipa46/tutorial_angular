import { Pageable} from "src/app/core/Pageable";
import { Autor } from "./Author";

export class AuthorPage
{
    contenido!:Autor[];
    pageable!:Pageable;
    elementos_totales!:number;

}