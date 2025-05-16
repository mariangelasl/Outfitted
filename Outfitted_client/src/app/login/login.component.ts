import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosUsuariosService } from '../services/usuario/datos-usuarios.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email = '';
  password = '';
  errorMessage = '';
  myForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private usuarioService: DatosUsuariosService,) 

  { this.myForm = new FormGroup({   }); }

  
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(datos: any) {
    
    if(this.myForm.valid){ //si los datos cumplen con los requisitos de validacion

      this.authService.esUsuario(datos.email).subscribe({ //confirmo que el usuario exista

        next: ()=>{ //si el usuario existe intento hacer login

          this.authService.login(datos).subscribe({
        
            next: (res) => { //si hago login
      
              const token = res.body.token;
              const user = res.body.user;
      
              //almaceno el usuario y el token
              this.usuarioService.guardarUsuario(user, token);
      
              //reidirjo a la pagina de bienvenida
              this.router.navigate(['welcome']);
            },
      
            error: (error) => { //si no se logra el login
              console.error('Error al iniciar sesión:', error);
              this.errorMessage = 'Credenciales incorrectas';
            }
          });
        }, 
      
        error: () =>{ //si no existe eñl usuario
          this.errorMessage = 'No existe ningun usuario registrado con este correo';
       } 
      });
    
    } else{
      this.errorMessage = "Datos invalidos";
    }
  }
}
