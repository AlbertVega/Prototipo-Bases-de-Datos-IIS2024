import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from '../../interfaces/AdminLogin';
import { AdminService } from '../../services/admin';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private service: AdminService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onLogin() {
    const request: Login = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.service.AdminLogin(request).subscribe({
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
