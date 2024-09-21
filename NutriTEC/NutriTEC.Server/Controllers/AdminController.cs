using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using NutriTEC.Server.Utility;
using NutriTEC.Server.Data;
using NutriTEC.Server.Models;

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
        public async Task<IActionResult> AdminLogin([FromBody] Admin_dto adminLog)
        {
            var response = new ResponseApi<string>();

            try
            {
                // Construir la ruta del .json
                var filePath = Path.Combine(_env.ContentRootPath, "DataBase", "ADMIN.json");

                // Leer el contenido del archivo .json
                var jsonData = await System.IO.File.ReadAllTextAsync(filePath);
                var admins = JsonSerializer.Deserialize<List<ADMIN>>(jsonData) ?? new List<ADMIN>();

                // Buscar el admin por correo
                var admin = admins.FirstOrDefault(c => c.email == adminLog.email);

                if (admin == null)
                {
                    response.status = false;
                    response.message = "Usuario no registrado";

                    return NotFound(response); // Enviar error 404 si no se encuentra el cliente
                }

                // Encriptar la contraseña ingresada
                byte[] PW = PWEncryption.SHA256Encoding(adminLog.password);


                // Comparar la contraseña encriptada con la almacenada en ADMIN.json
                if (PW.SequenceEqual(admin.password))
                {
                    // Si pasa la verificacion
                    response.status = true;
                    response.message = "Login exitoso";
                    return Ok(response);
                }else {
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

        [HttpPost("consultar_cargo")]
        public async Task<IActionResult> consultCharge([FromBody] ConsultCharge_dto consulta)
        {
            var response = new ResponseApi<string>();

            try
            {
                // Construir la ruta del .json
                var filePath = Path.Combine(_env.ContentRootPath, "DataBase", "NUTRITIONIST.json");

                // Leer el contenido del archivo .json
                var jsonData = await System.IO.File.ReadAllTextAsync(filePath);
                var nutritionists = JsonSerializer.Deserialize<List<NUTRITIONIST>>(jsonData) ?? new List<NUTRITIONIST>();

                // Filtrar la lista de nutricionistas por tipocobro
                var filteredNutritionists = nutritionists.Where(n => n.tipo_cobro == consulta.tipocobro).ToList();

                if (filteredNutritionists.Count == 0)
                {
                    response.status = false;
                    response.message = "No se encontraron nutricionistas con el tipo de cobro especificado";
                    return NotFound(response); // Enviar error 404 si no se encuentran nutricionistas
                }
                
                var nutritionistsInfo = new List<NutritionistChargeInfo>();
                foreach (var nutritionist in filteredNutritionists)
                {
                    nutritionistsInfo.Add(new NutritionistChargeInfo
                    {
                        correo = nutritionist.email,
                        nombre = nutritionist.nombre,
                        apellido1 = nutritionist.apellido1,
                        apellido2 = nutritionist.apellido2,
                        numero_tarjeta = nutritionist.numero_tarjeta
                    });
                }
                response.status = true;
                response.value = JsonSerializer.Serialize(nutritionistsInfo);
                response.message = "Consulta exitosa";
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
