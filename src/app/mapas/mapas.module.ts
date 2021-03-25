import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modulos 
import { MapasRoutingModule } from './mapas-routing.module';
// componemtes 
import { MiniMapaComponent } from './components/mini-mapa/mini-mapa.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';


@NgModule({
  declarations: [
    MiniMapaComponent, 
    FullScreenComponent,
     MarcadoresComponent,
      ZoomRangeComponent, 
      PropiedadesComponent],
  imports: [
    CommonModule,
    MapasRoutingModule
  ]
})
export class MapasModule { }
