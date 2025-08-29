using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using UygulamaHavuzu.Domain.Entities.WeatherModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace UygulamaHavuzu.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string? _apiKey;

        public WeatherController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _apiKey = configuration["WeatherApi:ApiKey"];
        }

        // GET: api/weather/Sakarya
        [HttpGet("{city}")]
        public async Task<ActionResult<WeatherResponse>> GetWeather(string city)
        {
            var weatherResponse = await FetchWeatherForCity(city);
            if (weatherResponse == null)
            {
                return NotFound($"'{city}' için hava durumu bilgisi bulunamadı.");
            }
            return Ok(weatherResponse);
        }

        // GET: api/weather/popular
        [HttpGet("popular")]
        public async Task<ActionResult<IEnumerable<WeatherResponse>>> GetPopularCitiesWeather()
        {
            var cities = new List<string> { "Istanbul", "Berlin", "London", "Paris" };
            var weatherTasks = cities.Select(city => FetchWeatherForCity(city)).ToList();
            var results = await Task.WhenAll(weatherTasks);

            var successfulResults = results.Where(r => r != null).ToList();

            return Ok(successfulResults);
        }

        // --- YARDIMCI METOTLAR ---

        // Tek bir şehir için veri çeken ve formatlayan özel metot
        private async Task<WeatherResponse?> FetchWeatherForCity(string city)
        {
            if (string.IsNullOrEmpty(_apiKey)) return null;

            var client = _httpClientFactory.CreateClient();
            string url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={_apiKey}&lang=tr&units=metric";

            try
            {
                var response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var responseStream = await response.Content.ReadAsStreamAsync();
                    var weatherResponse = await JsonSerializer.DeserializeAsync<WeatherResponse>(responseStream);

                    if (weatherResponse != null && weatherResponse.sys != null)
                    {
                        // Saat formatlama işlemini burada yapıyoruz.
                        weatherResponse.SunriseFormatted = UnixTimeStampToDateTime(weatherResponse.sys.sunrise).ToString("HH:mm:ss");
                        weatherResponse.SunsetFormatted = UnixTimeStampToDateTime(weatherResponse.sys.sunset).ToString("HH:mm:ss");
                    }
                    return weatherResponse;
                }
            }
            catch (HttpRequestException) { /* Hata durumunda null dönecek */ }
            
            return null;
        }

        // Unix zaman damgasını normal saate çeviren metot
        private DateTime UnixTimeStampToDateTime(long unixTimeStamp)
        {
            return DateTimeOffset.FromUnixTimeSeconds(unixTimeStamp).ToLocalTime().DateTime;
        }
    }
}