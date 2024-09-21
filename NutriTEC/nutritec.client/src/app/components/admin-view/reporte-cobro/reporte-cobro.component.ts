import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin';
import { ConsultCharge } from '../../../interfaces/ConsultCharge';

interface NutritionistChargeInfo {
  correo: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  numero_tarjeta: string;
}

@Component({
  selector: 'app-reporte-cobro',
  templateUrl: './reporte-cobro.component.html',
  styleUrl: './reporte-cobro.component.css'
})

export class ReporteCobroComponent implements OnInit {

  form!: FormGroup;
  nutritionistsInfo: NutritionistChargeInfo[] = [];
  constructor(private fb: FormBuilder, private service: AdminService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      tipocobro: ['', Validators.required]
    });
  }

  onConsult() {
    if (this.form.valid) {

      const request: ConsultCharge = {
        tipocobro: this.form.value.tipocobro
      }
      this.service.consultCharge(request).subscribe({
        next: (data) => {
          if (data.status) {
            try {
              this.nutritionistsInfo = JSON.parse(data.value); // Parsear el JSON string
              console.log(this.nutritionistsInfo);
            } catch (error) {
              console.error("Error al parsear JSON:", error);
            }
          } else {
            console.log("Error");
          }
        }
      })
    } else {
      console.log("Formulario invalido");
    }
  }

}
