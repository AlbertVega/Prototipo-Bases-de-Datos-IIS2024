import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginNutritionist } from '../../interfaces/LoginNutritionist';
import { NutritionistService } from '../../Services/nutritionist';

@Component({
  selector: 'app-nutritionist-login',
  templateUrl: './nutritionist-login.component.html',
  styleUrl: './nutritionist-login.component.css'
})
export class NutritionistLoginComponent implements OnInit{
  form!: FormGroup;

  constructor(private fb: FormBuilder, private service: NutritionistService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onLogin() {
    const request: LoginNutritionist = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.service.nutritionistLogin(request).subscribe({
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
