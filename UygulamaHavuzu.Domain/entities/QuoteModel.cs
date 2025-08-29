namespace UygulamaHavuzu.Domain.Entities
{
    public class QuoteModel
    {
        public string? Author { get; set; }
        public string? Content { get; set; }
        public string? TwitterShareUrl { get; set; } // YENİ EKLENEN ÖZELLİK
    }
}