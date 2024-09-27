import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
import { RegisterNutritionist } from '../interfaces/RegisterNutritionist';
import { LoginNutritionist } from '../interfaces/LoginNutritionist';
import { ClientInfo } from '../interfaces/ClientInfo';
import { NutritionistEmail } from '../interfaces/NutritionistEmail';
import { RegisterProduct } from '../interfaces/RegisterProduct';

@Injectable({
  providedIn: 'root'
})

export class NutritionistService {

  private urlApi: string = 'https://localhost:7159/api/';

  constructor(private http: HttpClient) { }

  getNutritionist(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(this.urlApi + 'Nutritionist');
  }

  registerNutritionist(request: RegisterNutritionist): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.urlApi + 'Nutritionist/register', request);
  }

  nutritionistLogin(request: LoginNutritionist): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.urlApi + "Nutritionist/login", request);
  }

  searchClient(request: ClientInfo): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.urlApi + "Nutritionist/search", request);
  }

  associateClient(request: NutritionistEmail): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.urlApi + "Nutritionist/associate", request);
  }

  registerProduct(request: RegisterProduct): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.urlApi + 'Nutritionist/registerProduct', request);
  }

}
