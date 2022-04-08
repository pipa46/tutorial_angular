import { Clientes } from "../clientes/Clientes";
import { Game } from "../game/Game";

export class Prestamos
{
    id:number;
    nombreJuego:Game;
    nombreCliente:Clientes;
    fechaInicio:string;
    fechaFin:string;
}