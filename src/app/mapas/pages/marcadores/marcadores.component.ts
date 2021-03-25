import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container { 
      width: 100%;
      height: 100%;
    }

    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 95;
    }

    li{
      cursor: pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements  AfterViewInit {

  @ViewChild('mapa') divMapa: ElementRef;
  mapa: mapboxgl.Map;
  zoomLevel: number = 15;
  centroMapa: [number, number] = [-80.72904834137263,-0.9547431283023476 ];

  // arreglo de marcadores 
  marcadores: MarcadorColor[] = [];

  
  constructor() { }
  ngAfterViewInit() {
    console.log('AfterViewInit', this.divMapa);
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.centroMapa,
      zoom: this.zoomLevel
      });
      this.leerLocalStorage();
      // const markerHtml: HTMLElement = document.createElement('div');
      // markerHtml.innerHTML = 'Hola Mundo';
      // {element: markerHtml} === esto iria dentro del Marker() 
      //  new mapboxgl.Marker()
      // .setLngLat(this.centroMapa)
      // .addTo(this.mapa);
  }

  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));// agregar color al alzar
    console.log(color);
    const nuevoMarcador = new mapboxgl.Marker({draggable: true, color:color})
      .setLngLat(this.centroMapa)
      .addTo(this.mapa);
      
      this.marcadores.push({
        color,
        marker:nuevoMarcador
      });

      this.guardarMarcadoresLocalStorage();
      nuevoMarcador.on('dragend', ()=>{
        // console.log('Se movio');
        this.guardarMarcadoresLocalStorage();
      });
  }

  irAlMarcador(marcador: mapboxgl.Marker){
    this.mapa.flyTo({
      center: marcador.getLngLat()
    });
  }

  guardarMarcadoresLocalStorage(){
    const lngArr: MarcadorColor[] = [];
    this.marcadores.forEach(n =>{
      const color = n.color;
      const {lng, lat} = n.marker.getLngLat();

      lngArr.push({
        color: color,
        centro: [lng, lat]
      })
    });

    localStorage.setItem('marcadores', JSON.stringify(lngArr));
  }

  leerLocalStorage(){
    if (!localStorage.getItem('marcadores')) {
      return;
    }
    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
    // console.log(lngLatArr);
    lngLatArr.forEach( m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa);
      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', ()=>{
        // console.log('Se movio');
        this.guardarMarcadoresLocalStorage();
      });
    });
  }

  borrarMarcador(i: number){
    // console.log('Borrando Marcador');
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadoresLocalStorage();
  }

}
