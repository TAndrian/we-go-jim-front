import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserService } from './user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserApiService } from './user-api.service';
import { CREATE_JANE_SMITH_MOCK, JANE_SMITH_MOCK, JOHN_DOE_MOCK } from '../util/UserMock';
import { of } from 'rxjs';
import { User } from '../model/User';

describe('UserService', () => {
  let service: UserService;
  let mockUserApiService: UserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), UserApiService]
    });
    mockUserApiService = TestBed.inject(UserApiService);
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user by Id', fakeAsync(() => {
    // ARRANGE
    let result: User | undefined;

    spyOn(mockUserApiService, 'getUserById')
      .withArgs(JOHN_DOE_MOCK.id)
      .and.returnValue(of(JOHN_DOE_MOCK));

    tick();

    // ACT
    service.getUserById(JOHN_DOE_MOCK.id).subscribe((user: User) => {
      result = user;
    });

    // ASSERT
    expect(result).toEqual(JOHN_DOE_MOCK);
  }));

  it('should create user', fakeAsync(() => {
    // ARRANGE
    let result: User | undefined;

    spyOn(mockUserApiService, 'createUser')
      .withArgs(CREATE_JANE_SMITH_MOCK)
      .and.returnValue(of(JANE_SMITH_MOCK));

    tick();

    // ACT
    service.createUser(CREATE_JANE_SMITH_MOCK).subscribe((user: User) => {
      result = user;
    });

    // ASSERT
    expect(result).toEqual(JANE_SMITH_MOCK);
  }));
});
