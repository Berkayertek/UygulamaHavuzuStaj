using Xunit;
using UygulamaHavuzu.API.Controllers;
using UygulamaHavuzu.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace UygulamaHavuzu.Test
{
    public class VkiControllerTests
    {
        // Test metotları [Fact] attribute'ü ile işaretlenir.
        [Fact]
        public void HesaplaVki_GecerliDegerlerle_DogruSonucDoner()
        {
            // Arrange (Hazırlık): Test için gerekli olan nesneleri ve verileri hazırlarız.
            var controller = new VkiController();
            var model = new VkiModel { Boy = 1.75, Kilo = 75 };
            var beklenenSonuc = 24.49;

            // Act (Eylem): Test edeceğimiz metodu çağırırız.
            var actionResult = controller.HesaplaVki(model);

            // Assert (Doğrulama): Eylem sonucunda elde ettiğimiz sonucun, 
            // beklediğimiz sonuçla aynı olup olmadığını kontrol ederiz.
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result); // Dönen sonucun 200 OK olduğundan emin ol
            var donenDeger = Assert.IsType<double>(okResult.Value); // Dönen değerin double olduğundan emin ol
            Assert.Equal(beklenenSonuc, donenDeger); // Dönen değerin beklenen sonuca eşit olduğunu kontrol et
        }
    }
}