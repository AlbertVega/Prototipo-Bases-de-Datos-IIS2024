using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using NutriTEC.Server.Utility;
using System.Text;
using NutriTEC.Server.Data1;
using NutriTEC.Server.Models1;

namespace NutriTEC.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        // Variable para acceder a la ruta del archivo .json usando IWebHostEnvironment
        private readonly IWebHostEnvironment _env;

        // Constructor que recibe un IWebHostEnvironment
        public AdminController(IWebHostEnvironment env)
        {
            _env = env;
        }
        [HttpGet]
        public async Task<IActionResult> getAdmins()
        {
            // Crear una instancia de ResponseApi
            var response = new ResponseApi<List<ADMIN>>();

            try
            {
                // Construir la ruta relativa al archivo .json
                var filePath = Path.Combine(_env.ContentRootPath, "DataBase", "ADMIN.json");

                // Leer el contenido del archivo .json
                var jsonData = await System.IO.File.ReadAllTextAsync(filePath);

                // Deserializar el contenido del archivo en una lista de CLIENTE
                var admins = JsonSerializer.Deserialize<List<ADMIN>>(jsonData);

                response.status = true;
                response.value = admins;
                response.message = "Success";
            }
            catch (Exception e)
            {
                response.status = false;
                response.message = e.Message;
            }

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> AdminLogin([FromBody] Login_dto loginRequest)
        {
            var response = new ResponseApi<string>();

            try
            {
                // Construir la ruta del .json
                var filePath = Path.Combine(_env.ContentRootPath, "DataBase", "ADMIN.json");

                // Leer el contenido del archivo .json
                var jsonData = await System.IO.File.ReadAllTextAsync(filePath);
                var clientes = JsonSerializer.Deserialize<List<ADMIN>>(jsonData) ?? new List<ADMIN>();

                // Buscar el cliente por correo
                var client = clientes.FirstOrDefault(c => c.email == loginRequest.email);

                if (client == null)
                {
                    response.status = false;
                    response.message = "Usuario no registrado";
                    Console.WriteLine("Usuario no registrado.");

                    return NotFound(response); // Enviar error 404 si no se encuentra el cliente
                }

                // Encriptar la contraseña ingresada con Base64
                string enteredPassword = Convert.ToBase64String(Encoding.UTF8.GetBytes(loginRequest.password));


                // Comparar la contraseña encriptada con la almacenada en CLIENTE.json
                if (!enteredPassword.Equals(client.password))
                {
                    response.status = false;
                    response.message = "Contraseña incorrecta";
                    Console.WriteLine("Contraseña incorrecta.");
                    return Unauthorized(response); // Enviar error 401 si la contra no es correcta 
                }

                // Si pasa la verificacion
                response.status = true;
                response.message = "Login exitoso";
                return Ok(response);
            }
            catch (Exception e)
            {
                response.status = false;
                response.message = e.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response); // Error de servidor
            }
        }
    }
}
