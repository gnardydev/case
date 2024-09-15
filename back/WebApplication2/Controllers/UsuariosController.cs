using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Data; 
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // Endpoint para registrar um novo usuário
        [HttpPost("register")]
        public async Task<ActionResult<Usuario>> Register(UserDto request)
        {
            // Verificar se o usuário já existe
            if (await _context.Usuarios.AnyAsync(u => u.Username == request.Username))
                return BadRequest("Usuário já existe.");

            // Criar hash da senha
            using var hmac = new HMACSHA512();
            var newUser = new Usuario
            {
                Username = request.Username,
                PasswordHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password))),
                CreatedAt = DateTime.UtcNow
            };

            _context.Usuarios.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(newUser);
        }

        // Endpoint para login
        [HttpPost("login")]
        public async Task<ActionResult<Usuario>> Login(UserDto request)
        {
            var user = await _context.Usuarios.SingleOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
                return NotFound("Usuário não encontrado.");

            using var hmac = new HMACSHA512();
            var computedHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password)));

            if (user.PasswordHash != computedHash)
                return BadRequest("Senha incorreta.");

            return Ok(user);
        }
    }

    public class UserDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
