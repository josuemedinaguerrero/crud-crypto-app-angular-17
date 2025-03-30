import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCryptoUseCase } from '../../../core/use-cases/create-crypto.use-case';
import { UpdateCryptoUseCase } from '../../../core/use-cases/update-crypto.use-case';
import { Router } from '@angular/router';
import { Crypto } from '../../../core/models/crypto.model';

interface NavigationState {
  crypto: Crypto;
}

@Component({
  selector: 'app-crypto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crypto-form.component.html',
  styleUrl: './crypto-form.component.css',
})
export class CryptoFormComponent {
  cryptoForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private createCryptoUseCase: CreateCryptoUseCase,
    private updateCryptoUseCase: UpdateCryptoUseCase,
    private router: Router
  ) {
    this.cryptoForm = this.fb.group({
      id: ['', Validators.required],
      symbol: ['', Validators.required],
      name: ['', Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as NavigationState;

    if (state?.crypto) {
      const crypto: Crypto = state.crypto;
      this.cryptoForm.patchValue(crypto);
      this.isEdit = true;
    }
  }

  guardarCrypto() {
    if (!this.cryptoForm.valid) return;

    const crypto: Crypto = this.cryptoForm.value;
    const res = this.createCryptoUseCase.execute(crypto);

    console.log('Criptomoneda guardada:', res);
    if (!res.id) console.log('Criptomoneda con id repetida.');

    this.router.navigate(['/']);
  }

  updateCrypto() {
    if (!this.cryptoForm.valid) return;

    const crypto: Crypto = this.cryptoForm.value;
    const res = this.updateCryptoUseCase.execute(crypto.id, crypto);

    console.log('Criptomoneda actualizada:', res);

    this.router.navigate(['/']);
  }
}
