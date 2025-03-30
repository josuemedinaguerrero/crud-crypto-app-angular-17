import { InjectionToken } from '@angular/core';
import { CryptoRepository } from './crypto.repository';

export const CRYPTO_REPOSITORY = new InjectionToken<CryptoRepository>('CryptoRepository');
