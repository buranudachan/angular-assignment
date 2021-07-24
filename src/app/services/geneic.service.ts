import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneicService {

  constructor(private _http: HttpClient) { }
  /*Get User List **/
  getUserList() {
    const headers = new HttpHeaders()
    return this._http.get(environment.apiUrl, { headers })
  }
}
