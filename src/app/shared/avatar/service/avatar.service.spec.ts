import { TestBed } from '@angular/core/testing';

import { AvatarService } from './avatar.service';
import { JOHN_DOE_MOCK } from '../../../features/user/util/UserMock';

describe('AvatarService', () => {
  let service: AvatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initials', () => {
    // ARRANGE
    let firstName = JOHN_DOE_MOCK.firstName;
    let lastName = JOHN_DOE_MOCK.lastName;

    // ACT
    let initial = service.getInitials(firstName, lastName);

    // ASSERT
    expect(initial).toBe('JD');
  });

  it('should return all initials when given multiple firstname and one lastname', () => {
    // ARRANGE
    let firstName = 'John JR';
    let lastName = JOHN_DOE_MOCK.lastName;

    // ACT
    let initial = service.getInitials(firstName, lastName);

    // ASSERT
    expect(initial).toBe('JJD');
  });

  it('should return all initials given one firstname and multiple lastname, ', () => {
    // ARRANGE
    let firstName = JOHN_DOE_MOCK.firstName;
    let lastName = 'le blanc';

    // ACT
    let initial = service.getInitials(firstName, lastName);

    // ASSERT
    expect(initial).toBe('JLB');
  });

  it('should return all initials given multiple firstname and multiple lastname, ', () => {
    // ARRANGE
    let firstName = 'John JR';
    let lastName = 'le blanc';

    // ACT
    let initial = service.getInitials(firstName, lastName);

    // ASSERT
    expect(initial).toBe('JJLB');
  });
});
