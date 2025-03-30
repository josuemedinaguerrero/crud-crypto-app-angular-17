import { Inject, Injectable } from '@angular/core';
import { CRYPTO_REPOSITORY } from '../../domain/crypto.token';
import { CryptoRepository } from '../../domain/crypto.repository';

@Injectable({ providedIn: 'root' })
export class DeleteCryptoUseCase {
  constructor(@Inject(CRYPTO_REPOSITORY) private cryptoRepository: CryptoRepository) {}

  execute(id: string): boolean {
    return this.cryptoRepository.delete(id);
  }
}
