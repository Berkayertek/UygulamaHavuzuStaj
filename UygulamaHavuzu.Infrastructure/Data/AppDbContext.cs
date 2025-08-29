using Microsoft.EntityFrameworkCore;
using UygulamaHavuzu.Domain.Entities;

namespace UygulamaHavuzu.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<ToDoItem> TodoItems { get; set; }
        public DbSet<User> Users { get; set; } // Bu satırı ekle
    }
}