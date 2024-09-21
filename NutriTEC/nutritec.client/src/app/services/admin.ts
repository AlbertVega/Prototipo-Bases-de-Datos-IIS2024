import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
import { Login } from '../interfaces/AdminLogin';
import { ConsultCharge } from '../interfaces/ConsultCharge';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private urlApi: string = 'https://localhost:7159/api/';

  constructor(private http: HttpClient) { }

  getClient(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(this.urlApi + 'Admin');
  }

  AdminLogin(request: Login): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.urlApi + "Admin/login", request);
  }

  consultCharge(request: ConsultCharge): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.urlApi + "Admin/consultar_cargo", request);
  }

}
