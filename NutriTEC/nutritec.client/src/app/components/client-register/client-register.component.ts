import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.css'
})
export class ClientRegisterComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    // verifica que la contraseña contenga las restricciones
    const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      nacimiento: ['', Validators.required],
      peso: ['', Validators.required],
      IMC: ['', Validators.required],
      pais: ['', Validators.required],
      cintura: ['', Validators.required],
      cuello: ['', Validators.required],
      caderas: ['', Validators.required],
      musculo: ['', Validators.required],
      grasa: ['', Validators.required],
      calorias: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidation]],
      password: ['', [Validators.required, Validators.pattern(StrongPasswordRegx)]]
    });

  }

  onRegister() {
    if (this.form.valid) {
      /*
      // dividir los dos apellidos
      let Apellidos: string[] = this.form.value.apellidos.split(' ');

      const request: RegisterPatient = {
        nombre: this.form.value.nombre,
        apellido1: Apellidos[0],
        apellido2: Apellidos[1],
        cedula: this.form.value.cedula,
        numeroTel: this.form.value.numeroTel,
        provincia: this.form.value.provincia,
        canton: this.form.value.canton,
        distrito: this.form.value.distrito,
        nacimiento: this.form.value.nacimiento,
        patologias: this.form.value.patologias,
        tratamientos: this.form.value.tratamientos,
        email: this.form.value.email,
        password: this.form.value.password
      }
      this.service.setPatient(request).subscribe({
        next: (data) => {
          if (data.status) {
            console.log(data.value);
          } else {
            console.log("Error");
          }
        }
      })*/
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
