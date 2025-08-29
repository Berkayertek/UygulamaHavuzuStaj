using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using UygulamaHavuzu.Domain.Entities;
using System.Web; // HttpUtility.UrlEncode için eklendi

namespace UygulamaHavuzu.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuotesController : ControllerBase
    {
        [HttpGet("random")]
        public async Task<ActionResult<QuoteModel>> GetRandomQuote()
        {
            var handler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true
            };

            var client = new HttpClient(handler);
            
            try
            {
                var response = await client.GetAsync("https://api.quotable.io/random");

                if (response.IsSuccessStatusCode)
                {
                    var responseStream = await response.Content.ReadAsStreamAsync();
                    var quote = await JsonSerializer.DeserializeAsync<QuoteModel>(responseStream, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                    if (quote != null)
                    {
                        var textToShare = $"\"{quote.Content}\" - {quote.Author}";
                        quote.TwitterShareUrl = $"https://twitter.com/intent/tweet?hashtags=Yazılım&text={HttpUtility.UrlEncode(textToShare)}";
                    }

                    return Ok(quote);
                }
                else
                {
                    return StatusCode((int)response.StatusCode, "Dış API'dan veri alınamadı.");
                }
            }
            catch (HttpRequestException)
            {
                return StatusCode(503, "Dış API'a ulaşılamıyor.");
            }
            finally
            {
                client.Dispose();
            }
        }
    }
}