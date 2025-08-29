namespace UygulamaHavuzu.Domain.Entities
{
    public class ToDoItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty; // Bu satır düzeltildi
        public bool IsCompleted { get; set; }
    }
}