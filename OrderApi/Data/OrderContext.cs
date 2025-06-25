// using Microsoft.EntityFrameworkCore;
// using OrderApi.Models;

// namespace OrderApi.Data
// {
//     public class OrderContext : DbContext
//     {
//         public OrderContext(DbContextOptions<OrderContext> options)
//             : base(options) { }

//         //public DbSet<Order> Orders => Set<Order>();
//         //public DbSet<Product> Products => Set<Product>();
//         public DbSet<Category> Categories => Set<Category>();
//     }
// }

using Microsoft.EntityFrameworkCore;
using OrderApi.Models;

namespace OrderApi.Data
{
    public class OrderContext : DbContext
    {
        public OrderContext(DbContextOptions<OrderContext> options)
            : base(options) { }

        public DbSet<Category> Categories => Set<Category>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Сеем данные в таблицу Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "חלב וגבינות" },
                new Category { Id = 2, Name = "טואליטיקה" },
                new Category { Id = 3, Name = "בשר" },
                new Category { Id = 4, Name = "ירקות ופירות" }
            );
        }
    }
}
