import { Component } from '@angular/core';
import { ListaAseguradosComponent } from './components/lista-asegurados/lista-asegurados.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaAseguradosComponent],
  template: `<app-lista-asegurados></app-lista-asegurados>`
})

export class AppComponent {}
