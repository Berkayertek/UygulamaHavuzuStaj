import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'; // PrimeNG Butonunu kullanacağız

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css'],
})
export class QuoteComponent implements OnInit {
  // API'dan gelen tüm veriyi (content, author, twitterShareUrl) bu nesnede tutacağız
  quote: any = null;

  constructor(private quoteService: QuoteService) {}

  // Component ilk yüklendiğinde bir söz getirelim
  ngOnInit(): void {
    this.getNewQuote();
  }

  // Servisi çağırarak yeni bir söz getiren metot
  getNewQuote(): void {
    this.quoteService.getRandomQuote().subscribe((data) => {
      this.quote = data;
    });
  }
}
