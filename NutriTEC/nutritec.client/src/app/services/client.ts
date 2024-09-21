import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
import { RegisterClient } from '../interfaces/RegisterClient';
import { LoginClient } from '../interfaces/LoginClient';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlApi: string = 'https://localhost:7159/api/';

  constructor(private http: HttpClient) { }

  getClient(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(this.urlApi + 'Client');
  }

  registerClient(request: RegisterClient): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.urlApi + 'Client/register', request);
  }

  clientLogin(request: LoginClient): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.urlApi + "Client/login", request);
  }

}
