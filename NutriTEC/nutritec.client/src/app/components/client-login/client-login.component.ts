import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginClient } from '../../interfaces/LoginClient';
import { ClientService } from '../../services/client';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrl: './client-login.component.css'
})
export class ClientLoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private service: ClientService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onLogin() {
    const request: LoginClient = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.service.clientLogin(request).subscribe({
      next: (data) => {
        if (data.status) {
          console.log("Login exitoso"); // Aqui se podria redireccionar
        } else {
          console.log(data.message);
        }
      },
      error: (err) => {
        console.log("Error en el login. Usuario o contraseña invalido", err);
      }
    });
  }
}
