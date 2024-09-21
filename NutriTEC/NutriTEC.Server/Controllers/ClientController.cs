using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using NutriTEC.Server.Data;
using NutriTEC.Server.Models;
using NutriTEC.Server.Utility;

namespace NutriTEC.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        // Variable para acceder a la ruta del archivo .json usando IWebHostEnvironment
        private readonly IWebHostEnvironment _env;

        // Constructor que recibe un IWebHostEnvironment
        public ClientController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> getClient()
        {
            // Crear una instancia de ResponseApi
            var response = new ResponseApi<List<CLIENTE>>();

            try
            {
                // Construir la ruta relativa al archivo .json
                var filePath = Path.Combine(_env.ContentRootPath, "DataBase", "CLIENTE.json");

                // Leer el contenido del archivo .json
                var jsonData = await System.IO.File.ReadAllTextAsync(filePath);

                // Deserializar el contenido del archivo en una lista de CLIENTE
                var clientes = JsonSerializer.Deserialize<List<CLIENTE>>(jsonData);

                response.status = true;
                response.value = clientes;
                response.message = "Success";
            }
            catch (Exception e)
            {
                response.status = false;
                response.message = e.Message;
            }

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> registerClient([FromBody] Client_dto newClient)
        {
            var response = new ResponseApi<Client_dto>();

            try
            {
                // Encriptar la contraseña del nuevo cliente
                byte[] pw = PWEncryption.SHA256Encoding(newClient.password);
                // Convertir la fecha de nacimiento a DateOnly
                DateOnly fecha_nacimiento = DateOnly.FromDateTime(newClient.nacimiento);
                // Crear una instancia de CLIENTE con los datos del nuevo cliente
                var client = new CLIENTE
                {
                    nombre = newClient.nombre,
                    apellido1 = newClient.apellido1,
                    apellido2 = newClient.apellido2,
                    nacimiento = fecha_nacimiento,
                    peso = newClient.peso,
                    IMC = newClient.IMC,
                    pais = newClient.pais,
                    cintura = newClient.cintura,
                    cuello = newClient.cuello,
                    caderas = newClient.caderas,
                    musculo = newClient.musculo,
                    grasa = newClient.grasa,
                    calorias = newClient.calorias,
                    email = newClient.email,
                    password = pw
                };

                var filePath = Path.Combine(_env.ContentRootPath, "DataBase", "CLIENTE.json");

                // Leer el contenido actual del archivo .json
                var jsonData = await System.IO.File.ReadAllTextAsync(filePath);
                var clientes = JsonSerializer.Deserialize<List<CLIENTE>>(jsonData) ?? new List<CLIENTE>();

                // Agregar el nuevo cliente a la lista
                clientes.Add(client);

                // Serializar la lista actualizada de vuelta al archivo .json
                var updatedJsonData = JsonSerializer.Serialize(clientes, new JsonSerializerOptions { WriteIndented = true });
                await System.IO.File.WriteAllTextAsync(filePath, updatedJsonData);

                response.status = true;
                response.value = newClient;
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
        public async Task<IActionResult> nutritionistLogin([FromBody] ClientLogin_dto ClientLog)
        {
            var response = new ResponseApi<string>();

            try
            {
                // Construir la ruta del .json
                var filePath = Path.Combine(_env.ContentRootPath, "DataBase", "CLIENTE.json");

                // Leer el contenido del archivo .json
                var jsonData = await System.IO.File.ReadAllTextAsync(filePath);
                var clients = JsonSerializer.Deserialize<List<CLIENTE>>(jsonData) ?? new List<CLIENTE>();

                // Buscar el admin por correo
                var client = clients.FirstOrDefault(c => c.email == ClientLog.email);

                if (client == null)
                {
                    response.status = false;
                    response.message = "Usuario no registrado";

                    return NotFound(response); // Enviar error 404 si no se encuentra el cliente
                }

                // Encriptar la contraseña ingresada
                byte[] PW = PWEncryption.SHA256Encoding(ClientLog.password);


                // Comparar la contraseña encriptada con la almacenada en ADMIN.json
                if (PW.SequenceEqual(client.password))
                {
                    // Si pasa la verificacion
                    response.status = true;
                    response.message = "Login exitoso";
                    return Ok(response);
                }
                else
                {
                    response.status = false;
                    response.message = "Contraseña incorrecta";
                    Console.WriteLine("Contraseña incorrecta.");
                    return Unauthorized(response); // Enviar error 401 si la contra no es correcta 
                }

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
