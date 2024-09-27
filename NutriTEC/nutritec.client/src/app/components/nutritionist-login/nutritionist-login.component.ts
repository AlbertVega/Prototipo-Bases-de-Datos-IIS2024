import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginNutritionist } from '../../interfaces/LoginNutritionist';
import { NutritionistService } from '../../services/nutritionist';
import { Router } from '@angular/router';
import { ShareEmailService } from '../../services/ShareEmail';

@Component({
  selector: 'app-nutritionist-login',
  templateUrl: './nutritionist-login.component.html',
  styleUrl: './nutritionist-login.component.css'
})
export class NutritionistLoginComponent implements OnInit{
  form!: FormGroup;
  validate: boolean = false;

  constructor(private fb: FormBuilder, private service: NutritionistService, private router: Router, private sharedService: ShareEmailService) { }

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
          console.log("Login exitoso");
          this.sharedService.setEmail(request.email); // Guarda el email en el servicio compartido
          this.router.navigate(['nutritionist-view']);
          this.validate = false
        } else {
          this.validate = true
          console.log(data.message);
        }
      },
      error: (err) => {
        this.validate = true
        console.log("Error en el login. Usuario o contraseña invalido", err);
      }
    });
  }

  test(): boolean {
    return this.validate;
  }
}
