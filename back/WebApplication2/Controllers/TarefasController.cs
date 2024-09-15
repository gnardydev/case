using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Data; 
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TarefasController(AppDbContext context)
        {
            _context = context;
        }

        // Endpoint para obter todas as tarefas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarefa>>> GetTarefas()
        {
            return await _context.Tarefas.Include(t => t.Usuario).ToListAsync();
        }

        // Endpoint para obter tarefas por usuário
        [HttpGet("usuario/{usuarioId}")]
        public async Task<ActionResult<IEnumerable<Tarefa>>> GetTarefasByUsuario(int usuarioId)
        {
            return await _context.Tarefas.Where(t => t.UserId == usuarioId).ToListAsync();
        }

        // Endpoint para criar uma nova tarefa
        [HttpPost]
        public async Task<ActionResult<Tarefa>> CreateTarefa(Tarefa tarefa)
        {
            _context.Tarefas.Add(tarefa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTarefas), new { id = tarefa.Id }, tarefa);
        }

        // Endpoint para atualizar uma tarefa
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTarefa(int id, Tarefa tarefa)
        {
            if (id != tarefa.Id)
                return BadRequest();

            _context.Entry(tarefa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TarefaExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // Endpoint para deletar uma tarefa
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarefa(int id)
        {
            var tarefa = await _context.Tarefas.FindAsync(id);
            if (tarefa == null)
                return NotFound();

            _context.Tarefas.Remove(tarefa);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Método auxiliar para verificar se uma tarefa existe
        private bool TarefaExists(int id)
        {
            return _context.Tarefas.Any(e => e.Id == id);
        }
    }
}
