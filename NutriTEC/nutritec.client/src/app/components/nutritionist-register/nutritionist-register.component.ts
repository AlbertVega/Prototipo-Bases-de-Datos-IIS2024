import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nutritionist-register',
  templateUrl: './nutritionist-register.component.html',
  styleUrl: './nutritionist-register.component.css'
})
export class NutritionistRegisterComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    // verifica que la contraseña contenga las restricciones
    const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      nacimiento: ['', Validators.required],
      cedula: ['', Validators.required],
      codnutricionista: ['', Validators.required],
      peso: ['', Validators.required],
      IMC: ['', Validators.required],
      direccion: ['', Validators.required],
      numerotarjeta: ['', Validators.required],
      tipocobro: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidation]],
      password: ['', [Validators.required, Validators.pattern(StrongPasswordRegx)]]
    });

  }

  onRegister() {
    if (this.form.valid) {
      console.log("Registro exitoso");
      console.log(this.form.value);
    } else {
      this.validateAllFormFields(this.form)
    }
  }

  // metodo para verficar el patron de correo@gmail.com
  emailValidation(control: AbstractControl) {

    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    const value = control.value;
    if (!pattern.test(value) && control.dirty) {
      return {
        emailError: true
      }
    } else return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  get passwordFormField() {
    return this.form.get('password');
  }
}
