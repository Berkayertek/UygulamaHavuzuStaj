using System.Collections.Generic;

namespace UygulamaHavuzu.Domain.Entities.WeatherModels
{
    public class WeatherResponse
    {
        public Coord? coord { get; set; }
        public List<Weather>? weather { get; set; }
        public string? @base { get; set; }
        public MainWeatherInfo? main { get; set; }
        public int visibility { get; set; }
        public Wind? wind { get; set; }
        public Sys? sys { get; set; } // Bu satırın varlığından emin olun
        public int timezone { get; set; }
        public int id { get; set; }
        public string? name { get; set; }
        public int cod { get; set; }
        public string? SunriseFormatted { get; set; } 
        public string? SunsetFormatted { get; set; } 
    }
}