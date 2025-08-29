using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UygulamaHavuzu.Domain.Entities;
using UygulamaHavuzu.Domain.Entities.DTOs;
using UygulamaHavuzu.Infrastructure.Data;

namespace UygulamaHavuzu.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            // Kullanıcının daha önce kayıt olup olmadığını kontrol et
            if (await _context.Users.AnyAsync(x => x.Username == userForRegisterDto.Username))
                return BadRequest("Kullanıcı adı zaten mevcut.");

            // Şifreyi hash'lemek için gerekli adımlar
            CreatePasswordHash(userForRegisterDto.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User
            {
                Username = userForRegisterDto.Username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return StatusCode(201); // Başarılı kayıt sonrası 201 Created durum kodu
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == userForLoginDto.Username);

            // Kullanıcı bulunamazsa hata döndür
            if (user == null)
                return Unauthorized("Geçersiz kullanıcı adı veya şifre.");

            // Girilen şifre ile veritabanındaki hash'lenmiş şifreyi karşılaştır
            if (!VerifyPasswordHash(userForLoginDto.Password, user.PasswordHash, user.PasswordSalt))
                return Unauthorized("Geçersiz kullanıcı adı veya şifre.");

            // TODO: JWT (JSON Web Token) oluşturma ve döndürme işlemi burada yapılacak.
            // Şimdilik sadece başarılı girişi onaylıyoruz.
            return Ok("Giriş başarılı!");
        }

        // --- Yardımcı Metotlar ---
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }
    }
}