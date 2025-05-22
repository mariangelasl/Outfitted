import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DatosUsuariosService } from '../services/usuario/datos-usuarios.service';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{


  myForm: FormGroup;
  errorMessage: string = '';
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: DatosUsuariosService,
    
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(datos: any) {

    if (!this.myForm.valid) {
    this.errorMessage = "Datos inválidos";
    return;
    }

    //compruebo si existe un usuario registrado con ese correo

      this.authService.yaRegistrado(datos.email).subscribe({
        next: () => {//si el correo esta disponible

        this.authService.registrar(datos).subscribe({//registro
          next: (res) => {
            const token = res.body.token;
            const user = res.body.user;
    
            this.usuarioService.guardarUsuario(user,token);
            
            //redirijo a la pagina de bienvenida
            this.router.navigate(['welcome']);
          },
          error: () => {
            this.errorMessage = 'Error al enviar el formulario';
          }
        });
      },error: () => { //si ya exis
            this.errorMessage = 'Este correo ya esta registrado';
          }
      });

    } 
    
  
}
