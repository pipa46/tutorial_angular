import { AuthorPage } from "./AuthorPage";

export const AUTHOR_DATA: AuthorPage = {
    contenido: [
        { id: 1, nombre: 'Klaus Teuber', nacionalidad: 'Alemania' },
        { id: 2, nombre: 'Matt Leacock', nacionalidad: 'Estados Unidos' },
        { id: 3, nombre: 'Keng Leong Yeo', nacionalidad: 'Singapur' },
        { id: 4, nombre: 'Gil Hova', nacionalidad: 'Estados Unidos'},
        { id: 5, nombre: 'Kelly Adams', nacionalidad: 'Estados Unidos' },
        { id: 6, nombre: 'J. Alex Kavern', nacionalidad: 'Estados Unidos' },
        { id: 7, nombre: 'Corey Young', nacionalidad: 'Estados Unidos' },
    ],  
    pageable : {
        tamaño_pagina: 5,
        n_pagina: 0,
        sort: [
            {propiedad: "id", direccion: "ASC"}
        ]
    },
    elementos_totales: 7
}
