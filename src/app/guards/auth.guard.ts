import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../app.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  const token = jwtService.getToken();
  const isExpired = jwtService.isExpired();

  // If no token or token is expired, redirect to login
  if (!token || isExpired) {
    router.navigate(['/auth']);
    return false;
  }

  // Token is valid, allow navigation
  return true;
};
