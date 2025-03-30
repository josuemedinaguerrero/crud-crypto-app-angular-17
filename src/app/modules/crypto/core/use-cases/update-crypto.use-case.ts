import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Crypto } from '../models/crypto.model';
import { CryptoRepository } from '../../domain/crypto.repository';
import { CRYPTO_REPOSITORY } from '../../domain/crypto.token';

@Injectable({ providedIn: 'root' })
export class UpdateCryptoUseCase {
  constructor(@Inject(CRYPTO_REPOSITORY) private cryptoRepository: CryptoRepository) {}

  execute(id: string, crypto: Crypto): string {
    return this.cryptoRepository.update(id, crypto);
  }
}
