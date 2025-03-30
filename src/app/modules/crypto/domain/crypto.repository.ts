import { Observable } from 'rxjs';
import { Crypto } from '../core/models/crypto.model';

export interface CryptoRepository {
  getAll(): Observable<Crypto[]>;
  create(crypto: Crypto): Crypto;
  update(id: string, crypto: Crypto): string;
  delete(id: string): boolean;
}
