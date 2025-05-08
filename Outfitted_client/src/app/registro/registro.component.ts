import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
    private formBuilder: FormBuilder
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

    if (this.myForm.valid){
      this.authService.registrar(datos).subscribe({
        next: (res) => {
          const token = res.body.token;
          const user = res.body.user;
  
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          
          //redirijo a la pagina de bienvenida
          this.router.navigate(['welcome']);
        },
        error: () => {
          this.errorMessage = 'Error al enviar el formulario';
        }
      });
    } else{
      this.errorMessage = "Datos invalidos"
    }
    
  }
}
