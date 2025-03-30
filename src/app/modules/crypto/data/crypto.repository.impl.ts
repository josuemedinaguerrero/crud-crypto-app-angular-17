import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CryptoRepository } from '../domain/crypto.repository';
import { Crypto } from '../core/models/crypto.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoRepositoryImpl implements CryptoRepository {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins/list';
  private storageKey = 'cryptoData';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Crypto[]> {
    const cryptoData = sessionStorage.getItem(this.storageKey);

    if (cryptoData) return of(JSON.parse(cryptoData));

    return this.http.get<Crypto[]>(this.apiUrl).pipe(
      tap((data) => {
        sessionStorage.setItem(this.storageKey, JSON.stringify(data));
      })
    );
  }

  create(crypto: Crypto): Crypto {
    const cryptoData = sessionStorage.getItem(this.storageKey);
    const cryptoList: Crypto[] = cryptoData ? JSON.parse(cryptoData) : [];

    cryptoList.unshift(crypto);

    sessionStorage.setItem(this.storageKey, JSON.stringify(cryptoList));
    return crypto;
  }

  update(id: string, crypto: Crypto): string {
    return '';
  }

  delete(id: string): boolean {
    return true;
  }
}
