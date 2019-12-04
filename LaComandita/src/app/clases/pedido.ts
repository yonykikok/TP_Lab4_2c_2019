import { Usuario } from './usuario';
import { Mesa } from './mesa';
import { Comidas } from './pedido/comidas';
import { Bebidas } from './pedido/bebidas';
import { Postres } from './pedido/postres';
import { Tragos } from './pedido/tragos';
import { Cliente } from './pedido/cliente';

export class Pedido {
    comidas: Comidas[];
    bebidas: Bebidas[];
    postres: Postres[];
    tragos: Tragos[];
    cliente: Cliente;
    mesa: Mesa;
    estado: string;

    constructor() {
        this.comidas = [];
        this.bebidas = [];
        this.postres = [];
        this.tragos = [];
        this.cliente=new Cliente();

    }
}
