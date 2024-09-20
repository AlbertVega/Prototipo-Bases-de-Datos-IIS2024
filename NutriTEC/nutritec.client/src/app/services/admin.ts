import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
import { Login } from '../interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlApi: string = 'https://localhost:7159/api/';

  constructor(private http: HttpClient) { }

  AdminLogin(request: Login): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.urlApi + "Admin/Login", request);
  }

}
