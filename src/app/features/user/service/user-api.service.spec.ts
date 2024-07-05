import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { User } from '../model/User';
import { CREATE_JANE_SMITH_MOCK, JANE_SMITH_MOCK, JOHN_DOE_MOCK } from '../util/UserMock';
import { UserApiService } from './user-api.service';

describe('UserApiService', () => {
  let service: UserApiService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), UserApiService, HttpClient]
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user by id', fakeAsync(() => {
    // ARRANGE
    spyOn(httpClient, 'get').and.returnValue(of(JOHN_DOE_MOCK));
    tick();

    // ACT
    service.getUserById(JOHN_DOE_MOCK.id).subscribe((user: User) => {
      expect(user).toBe(JOHN_DOE_MOCK);
    });

    // ASSERT
    expect(httpClient.get).toHaveBeenCalledTimes(1);
  }));

  it('should create user', fakeAsync(() => {
    // ARRANGE
    let requestBody = CREATE_JANE_SMITH_MOCK;
    spyOn(httpClient, 'post').and.returnValue(of(JANE_SMITH_MOCK));
    tick();

    // ACT
    service.createUser(requestBody).subscribe((user: User) => {
      expect(user).toBe(JANE_SMITH_MOCK);
    });

    // ASSERT
    expect(httpClient.post).toHaveBeenCalledTimes(1);
  }));
});
