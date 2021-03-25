import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container { 
      width: 100%;
      height: 100%;
    }
    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 8px;
      position: fixed;
      z-index: 900;
      width:400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa: ElementRef;

  mapa: mapboxgl.Map;
  zoomLevel: number = 10;
  centroMapa: [number, number] = [-80.72904834137263,-0.9547431283023476 ];

  constructor() {
    console.log('Constructor', this.divMapa);
   }

  ngOnDestroy(): void {
    this.mapa.off('zoom', ()=> {});
    this.mapa.off('zoomend', ()=> {});
    this.mapa.off('move', ()=> {});
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit', this.divMapa);
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.centroMapa,
      zoom: this.zoomLevel
      });
    this.mapa.on('zoom', (ev)=>{
      // console.log('zoom');
      // console.log(even);
      // const zoomActual = this.mapa.getZoom();
      this.zoomLevel = this.mapa.getZoom();
      // console.log(zoomActual);
    });  
    this.mapa.on('zoomend', (ev)=>{
      if ( this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });
    this.mapa.on('move', (event)=>{
        // console.log(ev);
        const target = event.target;
        const {lng, lat} = target.getCenter();
        this.centroMapa = [lng, lat];
    });
  }

  zoomOut(){
  // console.log('zoomOut');
  // console.log('zoomOut', this.divMapa);
  this.mapa.zoomOut();
  // this.zoomLevel = this.mapa.getZoom();
  }

  zoomIn(){
  // console.log('zoomIn');
  this.mapa.zoomIn();
  // this.zoomLevel = this.mapa.getZoom();

  }

  zoomCambio(valor: string){
    // console.log(valor);
    this.mapa.zoomTo(Number(valor));
    
  }

}
