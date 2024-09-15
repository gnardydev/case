using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Data
{
    public class Tarefa
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsCompleted { get; set; } = false;

        public string Category { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // aqui criei como date time ja

        public DateTime? UpdatedAt { get; set; }

        public int UserId { get; set; }

        public Usuario Usuario { get; set; }
    }
}