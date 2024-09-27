import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin';
import { ConsultCharge } from '../../../interfaces/ConsultCharge';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  printPDF() {
    const element = document.getElementById('infoCobro');
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save('reporte_de_cobro.pdf');
      }).catch(error => {
        console.error("Error al generar el PDF:", error);
      });
    } else {
      console.error("Elemento con id 'infoCobro' no encontrado.");
    }
  }

}
