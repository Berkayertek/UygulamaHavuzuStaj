using Microsoft.AspNetCore.Mvc;
using UygulamaHavuzu.Domain.Entities;
using System;

namespace UygulamaHavuzu.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VkiController : ControllerBase
    {
        [HttpPost("hesapla")]
        public ActionResult<VkiSonucModel> HesaplaVki([FromBody] VkiModel model)
        {
            if (model.Boy <= 0 || model.Kilo <= 0)
            {
                return BadRequest("Boy ve kilo pozitif bir değer olmalıdır.");
            }

            var vki = model.Kilo / (model.Boy * model.Boy);
            var vkiYuvarlak = Math.Round(vki, 2);

            string sonucMetni;
            if (vkiYuvarlak < 18.5)
                sonucMetni = "Zayıf";
            else if (vkiYuvarlak < 24.9)
                sonucMetni = "Normal Kilo";
            else if (vkiYuvarlak < 29.9)
                sonucMetni = "Fazla Kilolu";
            else
                sonucMetni = "Obez";

            var sonuc = new VkiSonucModel
            {
                Vki = vkiYuvarlak,
                SonucMetni = sonucMetni
            };

            return Ok(sonuc);
        }
    }
}