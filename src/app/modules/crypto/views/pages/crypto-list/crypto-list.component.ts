import { Component, OnInit } from '@angular/core';
import { Crypto } from '../../../core/models/crypto.model';
import { GetCryptosUseCase } from '../../../core/use-cases/get-cryptos.use-case';
import { DeleteCryptoUseCase } from '../../../core/use-cases/delete-crypto.use-case';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crypto-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './crypto-list.component.html',
  styleUrl: './crypto-list.component.css',
})
export class CryptoListComponent implements OnInit {
  cryptos: Crypto[] = [];
  paginatedCryptos: Crypto[] = [];

  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  startIndex = 0;
  endIndex = 0;

  constructor(
    private getCryptosUseCase: GetCryptosUseCase,
    private deleteCryptoUseCase: DeleteCryptoUseCase,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCryptosUseCase.execute().subscribe((data) => {
      this.cryptos = data;
      this.calculateTotalPages();
      this.updatePaginatedCryptos();
    });
  }

  editCrypto(crypto: Crypto) {
    this.router.navigate(['/crypto/form'], { state: { crypto } });
  }

  deleteCrypto(crypto: Crypto) {
    const res = this.deleteCryptoUseCase.execute(crypto.id);
    if (!res) return;

    this.cryptos = this.cryptos.filter((c) => c.id !== crypto.id);

    this.calculateTotalPages();
    this.updatePaginatedCryptos();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.cryptos.length / this.pageSize);
  }

  updatePaginatedCryptos(): void {
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = Math.min(this.startIndex + this.pageSize, this.cryptos.length);
    this.paginatedCryptos = this.cryptos.slice(this.startIndex, this.endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedCryptos();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  getMiddlePageNumbers(): number[] {
    const pages: number[] = [];
    let start = Math.max(2, this.currentPage - 1);
    let end = Math.min(this.totalPages - 1, start + 2);

    if (end === this.totalPages - 1) start = Math.max(2, end - 2);

    for (let i = start; i <= end; i++) pages.push(i);

    return pages;
  }
}
