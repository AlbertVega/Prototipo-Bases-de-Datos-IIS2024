import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nutritionist-login',
  templateUrl: './nutritionist-login.component.html',
  styleUrl: './nutritionist-login.component.css'
})
export class NutritionistLoginComponent implements OnInit{
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onLogin() {

    console.log('Email: ', this.form.value.email);
    console.log('Password: ', this.form.value.password);

  }
}
