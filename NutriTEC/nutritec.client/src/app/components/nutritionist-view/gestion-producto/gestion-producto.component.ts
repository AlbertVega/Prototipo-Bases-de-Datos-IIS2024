import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterProduct } from '../../../interfaces/RegisterProduct';
import { NutritionistService } from '../../../services/nutritionist';

@Component({
  selector: 'app-gestion-producto',
  templateUrl: './gestion-producto.component.html',
  styleUrl: './gestion-producto.component.css'
})
export class GestionProductoComponent implements OnInit{

  form!: FormGroup;

  constructor(private fb: FormBuilder, private service: NutritionistService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      cod_barras: ['', Validators.required],
      tamano_porcion: ['', Validators.required],
      descripcion: ['', Validators.required],
      proteina: ['', Validators.required],
      nombre: ['', Validators.required],
      energia: ['', Validators.required],
      carbohidratos: ['', Validators.required],
      hierro: ['', Validators.required],
      calcio: ['', Validators.required],
      vitaminas: ['', Validators.required],
      sodio: ['', Validators.required],
      grasa: ['', Validators.required]
    });
  }

  onRegisterProduct () {
    if (this.form.valid) {
      const request: RegisterProduct = {
        cod_barras: this.form.value.cod_barras,
        tamano_porcion: this.form.value.tamano_porcion,
        descripcion: this.form.value.descripcion,
        proteina: this.form.value.proteina,
        nombre: this.form.value.nombre,
        energia: this.form.value.energia,
        carbohidratos: this.form.value.carbohidratos,
        hierro: this.form.value.hierro,
        calcio: this.form.value.calcio,
        vitaminas: this.form.value.vitaminas,
        sodio: this.form.value.sodio,
        grasa: this.form.value.grasa
      }
      this.service.registerProduct(request).subscribe({
        next: (data) => {
          if (data.status) {
            alert('Registro de producto exitoso');
            console.log(data.value);
          } else {
            console.log("Error");
          }
        }
      })
    } else {
      this.validateAllFormFields(this.form)
    }
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
}
