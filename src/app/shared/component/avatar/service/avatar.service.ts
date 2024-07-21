import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  /**
   * Get the initials of the user's fullname.
   * @param firstname  user's firstname.
   * @param lastname  user's lastname.
   * @returns  Initials of the user.
   */
  getInitials(firstname: string, lastname: string): string {
    const firstParts = firstname.split(' ');
    const lastParts = lastname.split(' ');

    const firstInitials = firstParts.map((part) => part.charAt(0).toUpperCase()).join('');

    const lastInitials = lastParts.map((part) => part.charAt(0).toUpperCase()).join('');

    return firstInitials + lastInitials;
  }
}
