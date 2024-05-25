import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  addEmployee(empData:any):Observable<any>{
    return this._http.post<any>('http://localhost:3000/employee',empData)
  }

  getEmployeeDatas():Observable<any>{
    return this._http.get<any>('http://localhost:3000/employee');
      }



}
