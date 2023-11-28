import { Component, OnInit } from '@angular/core';
import { Evento } from './models/evento.model';
import data from '../assets/data.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  eventos: Evento[] = [];
  fecha_actual:Date;
  direcciones: string[] = [];
  seleccionDireccion:string = "";

  ngOnInit() {
    // Cargamos el fichero JSON
    const json: any = data;

    // Guardamos el fichero cargado en el array de Eventos
    this.eventos = json;

    // Convertimos las fechas a tipo Date
    this.eventos.map((value) => value.fecha = new Date(value.fecha));
    this.fecha_actual = new Date();
    this.direcciones = this.obtenerDireccionesUnicas(json);
  }

  obtenerDireccionesUnicas(direcciones: any[]): string[] {
    // Utiliza un conjunto (Set) para almacenar direcciones únicas
    const direccionesUnicasSet = new Set<string>();
  
    // Itera sobre el array de 'direcciones' y agrega cada dirección al conjunto
    direcciones.forEach(item => {
      direccionesUnicasSet.add(item.direccion);
    });
  
    // Convierte el conjunto de nuevo a un array
    return Array.from(direccionesUnicasSet);
  }
  
  proximosEventos(): Evento[]{
    return this.filtrarPorDireccion().filter(Evento => Evento.fecha >= this.fecha_actual);
  }

  eventosPasados(): Evento[]{
    return this.filtrarPorDireccion().filter(evento => evento.fecha <= this.fecha_actual);
  }

  filtrarPorDireccion(): Evento[] {
    if (this.seleccionDireccion === "") {
      return this.eventos; // Si no hay dirección seleccionada, muestra todos los eventos futuros
    }
    return this.eventos.filter(evento => evento.direccion === this.seleccionDireccion);
  }

}