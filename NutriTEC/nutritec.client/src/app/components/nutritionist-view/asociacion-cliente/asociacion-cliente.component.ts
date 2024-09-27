import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NutritionistService } from '../../../services/nutritionist';
import { ClientInfo } from '../../../interfaces/ClientInfo';
import { NutritionistEmail } from '../../../interfaces/NutritionistEmail';
import { ShareEmailService } from '../../../services/ShareEmail';

@Component({
  selector: 'app-asociacion-cliente',
  templateUrl: './asociacion-cliente.component.html',
  styleUrl: './asociacion-cliente.component.css'
})
export class AsociacionClienteComponent implements OnInit {

  form!: FormGroup;
  ClientInfo!: ClientInfo;
  validate: boolean = false;
  nutritionistEmail: string = '';

  constructor(private fb: FormBuilder, private service: NutritionistService, private sharedService: ShareEmailService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      correo: ['', Validators.required]
    });

    this.ClientInfo = {
      nombre: '',
      apellido1: '',
      apellido2: '',
      correo: ''
    };

    this.nutritionistEmail = this.sharedService.getEmail();
  }

  onSearch() {
    if (this.form.valid) {

      const request: ClientInfo = {
        correo: this.form.value.correo,
        nombre: this.form.value.nombre,
        apellido1: this.form.value.apellido1,
        apellido2: this.form.value.apellido2
      }
      this.service.searchClient(request).subscribe({
        next: (data) => {
          if (data.status) {
            try {
              this.ClientInfo.nombre = this.form.value.nombre;
              this.ClientInfo.apellido1 = this.form.value.apellido1;
              this.ClientInfo.apellido2 = this.form.value.apellido2;
              this.ClientInfo.correo = this.form.value.correo;
              console.log(this.ClientInfo);
            } catch (error) {
              console.error(error);
            }
            this.validate = false;
          } else {
            this.ClientInfo = { nombre: '', apellido1: '', apellido2: '', correo: '' };
            console.log("No se encontró dicho cliente");
            this.validate = true;
          }
        }
      });
    } else {
      console.log("Formulario invalido");
    }
  }

  found(): boolean {
    return this.validate;
  }

  AssociateClient() {
    const request: NutritionistEmail = {
      nutri_email: this.nutritionistEmail,
      client_email: this.ClientInfo.correo
    }

    this.service.associateClient(request).subscribe({
      next: (data) => {
        if (data.status) {
          try {
            console.log(this.ClientInfo);
            alert('Cliente asociado con éxito');
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log(data.message);
          alert('Error al asociar cliente');
        }
      },
      error: (err) => {
        this.validate = true
        console.log("No se encontró el cliente", err);
      }
    });
  }

}
