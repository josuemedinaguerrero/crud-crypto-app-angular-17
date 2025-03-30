import { Crypto } from './../models/crypto.model';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CRYPTO_REPOSITORY } from '../../domain/crypto.token';
import { CryptoRepository } from '../../domain/crypto.repository';

@Injectable({ providedIn: 'root' })
export class GetCryptosUseCase {
  constructor(@Inject(CRYPTO_REPOSITORY) private cryptoRepository: CryptoRepository) {}

  execute(): Observable<Crypto[]> {
    return this.cryptoRepository.getAll();
  }
}
