import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/User';
import { CreateUser } from '../model/CreateUser';

const DEFAULT_USER: User = {
  id: '',
  firstName: '',
  lastName: '',
  email: ''
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubjectMap: Map<string, BehaviorSubject<User>> = new Map();
  private createdUserSubject$: BehaviorSubject<User> = new BehaviorSubject<User>(DEFAULT_USER);

  constructor(private readonly _userApiService: UserApiService) {}

  /**
   * Load user based on given userId.
   * @param userId user id.
   */
  private loadUserById(userId: string): void {
    if (!this.userSubjectMap.has(userId)) {
      const userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(DEFAULT_USER);
      this.userSubjectMap.set(userId, userSubject);
      this._userApiService.getUserById(userId).subscribe((user: User) => {
        userSubject.next(user);
      });
    }
  }

  /**
   * Fetch user based on given userId.
   * @param userId user id.
   * @returns user based on userId.
   */
  getUserById(userId: string): Observable<User> {
    this.loadUserById(userId);
    return this.userSubjectMap.get(userId)!.asObservable();
  }

  /**
   * Fetch the created user.
   * @param userToCreate user to create.
   */
  private getCreatedUser(userToCreate: CreateUser): void {
    this._userApiService.createUser(userToCreate).subscribe((user: User) => {
      this.createdUserSubject$.next(user);
    });
  }

  /**
   * Create user.
   * @param userToCreate User to create.
   * @returns created user.
   */
  createUser(userToCreate: CreateUser): Observable<User> {
    this.getCreatedUser(userToCreate);
    return this.createdUserSubject$.asObservable();
  }
}
