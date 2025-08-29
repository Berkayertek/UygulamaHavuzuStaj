using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UygulamaHavuzu.Domain.Entities;
using UygulamaHavuzu.Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UygulamaHavuzu.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/todos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetTodoItems()
        {
            return await _context.TodoItems.ToListAsync();
        }

        // GET: api/todos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItem>> GetTodoItem(int id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // POST: api/todos
        [HttpPost]
        public async Task<ActionResult<ToDoItem>> PostTodoItem([FromBody] ToDoItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/todos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        // PUT: api/todos/5 -> ID'si 5 olan yapılacak işi günceller
     [HttpPut("{id}")]
public async Task<IActionResult> PutTodoItem(int id, ToDoItem todoItemFromRequest)
{
    if (id != todoItemFromRequest.Id)
    {
        return BadRequest();
    }

    // 1. Güncellenecek kaydı veritabanından bul
    var todoItemFromDb = await _context.TodoItems.FindAsync(id);

    if (todoItemFromDb == null)
    {
        return NotFound();
    }

    // 2. Gelen yeni bilgileri, veritabanından bulduğumuz kaydın üzerine işle
    todoItemFromDb.Title = todoItemFromRequest.Title;
    todoItemFromDb.IsCompleted = todoItemFromRequest.IsCompleted;

    try
    {
        // 3. Değişiklikleri kaydet
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!TodoItemExists(id))
        {
            return NotFound();
        }
        else
        {
            throw;
        }
    }

    return NoContent(); // Başarılı güncelleme sonrası 204 No Content durum kodu döndür.
}

private bool TodoItemExists(int id)
{
    return _context.TodoItems.Any(e => e.Id == id);
}
    }
}
