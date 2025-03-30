import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoListComponent } from './views/pages/crypto-list/crypto-list.component';
import { CryptoFormComponent } from './views/pages/crypto-form/crypto-form.component';

const routes: Routes = [
  { path: '', component: CryptoListComponent },
  { path: 'form', component: CryptoFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptoRoutingModule {}
