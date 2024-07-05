import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../environments/environment';
import { REQUEST_OPTIONS } from '../../../shared/utils/HttpHeaders';
import { User } from '../model/User';
import { API_USER } from '../util/UserResourcePath';
import { CreateUser } from '../model/CreateUser';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getUserById(userId: string): Observable<User> {
    let apiUrl = ENVIRONMENT.apiUrl + API_USER + `/${userId}`;
    return this.httpClient.get<User>(apiUrl, REQUEST_OPTIONS);
  }

  createUser(userToCreate: CreateUser): Observable<User> {
    let apiUrl = ENVIRONMENT.apiUrl + API_USER;
    return this.httpClient.post<User>(apiUrl, userToCreate, REQUEST_OPTIONS);
  }
}
