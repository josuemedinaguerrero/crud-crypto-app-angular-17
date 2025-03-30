import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'crypto',
    loadChildren: () => import('./modules/crypto/crypto.module').then((x) => x.CryptoModule),
  },
  { path: '', redirectTo: '/crypto', pathMatch: 'full' },
];
