namespace UygulamaHavuzu.Domain.Entities
{
    public class VkiSonucModel
    {
        public double Vki { get; set; } // Hesaplanan sayısal değer (örn: 24.49)
        public string? SonucMetni { get; set; } // Sonucun metinsel karşılığı (örn: "Normal Kilo")
    }
}