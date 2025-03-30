import { Inject, Injectable } from '@angular/core';
import { Crypto } from '../models/crypto.model';
import { CRYPTO_REPOSITORY } from '../../domain/crypto.token';
import { CryptoRepository } from '../../domain/crypto.repository';

@Injectable({ providedIn: 'root' })
export class CreateCryptoUseCase {
  constructor(@Inject(CRYPTO_REPOSITORY) private cryptoRepository: CryptoRepository) {}

  execute(crypto: Crypto): Crypto {
    return this.cryptoRepository.create(crypto);
  }
}
