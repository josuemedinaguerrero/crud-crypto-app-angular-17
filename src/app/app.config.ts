import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CRYPTO_REPOSITORY } from './modules/crypto/domain/crypto.token';
import { CryptoRepositoryImpl } from './modules/crypto/data/crypto.repository.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: CRYPTO_REPOSITORY, useClass: CryptoRepositoryImpl },
  ],
};
