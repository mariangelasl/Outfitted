import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{

  nombreUsuario: string = '';

  ngOnInit(): void {
    const datos = localStorage.getItem('user');
    if (datos) {
      const usuario = JSON.parse(datos);
      this.nombreUsuario = usuario.name;
    }
  }
}
