//using Microsoft.AspNetCore.Mvc;
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
    public class NutritionistController : ControllerBase
    {
        // Variable para acceder a la ruta del archivo .json usando IWebHostEnvironment
        private readonly IWebHostEnvironment _env;

        // Constructor que recibe un IWebHostEnvironment
        public NutritionistController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> getNutritionist()
        {
            // Crear una instancia de ResponseApi
            var response = new ResponseApi<List<NUTRITIONIST>>();

            try
            {
                // Construir la ruta relativa al archivo .json
                var filePath = Path.Combine(_env.ContentRootPath, "DataBase", "NUTRITIONIST.json");

                // Leer el contenido del archivo .json
                var jsonData = await System.IO.File.ReadAllTextAsync(filePath);

                // Deserializar el contenido del archivo en una lista de CLIENTE
                var nutritionists = JsonSerializer.Deserialize<List<NUTRITIONIST>>(jsonData);

                response.status = true;
                response.value = nutritionists;
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
        public async Task<IActionResult> registerNutritionist([FromBody] Nutritionist_dto newNutritionist)
        {
            var response = new ResponseApi<Nutritionist_dto>();

            try
            {
                // Encriptar la contraseña del nuevo cliente
                byte[] pw = PWEncryption.SHA256Encoding(newNutritionist.password);
                // Convertir la fecha de nacimiento a DateOnly
                DateOnly fecha_nacimiento = DateOnly.FromDateTime(newNutritionist.nacimiento);
                // Crear una instancia de CLIENTE con los datos del nuevo cliente
                var client = new NUTRITIONIST
                {
                    nombre = newNutritionist.nombre,
                    apellido1 = newNutritionist.apellido1,
                    apellido2 = newNutritionist.apellido2,
                    nacimiento = fecha_nacimiento,
                    cedula = newNutritionist.cedula,
                    cod_nutricionista = newNutritionist.codnutricionista,
                    peso = newNutritionist.peso,
                    IMC = newNutritionist.IMC,
                    direccion = newNutritionist.direccion,
                    numero_tarjeta = newNutritionist.numerotarjeta,
                    tipo_cobro = newNutritionist.tipocobro, 
                    email = newNutritionist.email,
                    password = pw
                };

                var filePath = Path.Combine(_env.ContentRootPath, "DataBase", "NUTRITIONIST.json");

                // Leer el contenido actual del archivo .json
                var jsonData = await System.IO.File.ReadAllTextAsync(filePath);
                var nutritionists = JsonSerializer.Deserialize<List<NUTRITIONIST>>(jsonData) ?? new List<NUTRITIONIST>();

                // Agregar el nuevo cliente a la lista
                nutritionists.Add(client);

                // Serializar la lista actualizada de vuelta al archivo .json
                var updatedJsonData = JsonSerializer.Serialize(nutritionists, new JsonSerializerOptions { WriteIndented = true });
                await System.IO.File.WriteAllTextAsync(filePath, updatedJsonData);

                response.status = true;
                response.value = newNutritionist;
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
        public async Task<IActionResult> nutritionistLogin([FromBody] NutritionistLogin_dto NutritionistLog)
        {
            var response = new ResponseApi<string>();

            try
            {
                // Construir la ruta del .json
                var filePath = Path.Combine(_env.ContentRootPath, "DataBase", "NUTRITIONIST.json");

                // Leer el contenido del archivo .json
                var jsonData = await System.IO.File.ReadAllTextAsync(filePath);
                var nutritionists = JsonSerializer.Deserialize<List<NUTRITIONIST>>(jsonData) ?? new List<NUTRITIONIST>();

                // Buscar el admin por correo
                var nutritionist = nutritionists.FirstOrDefault(c => c.email == NutritionistLog.email);

                if (nutritionist == null)
                {
                    response.status = false;
                    response.message = "Usuario no registrado";

                    return NotFound(response); // Enviar error 404 si no se encuentra el cliente
                }

                // Encriptar la contraseña ingresada
                byte[] PW = PWEncryption.SHA256Encoding(NutritionistLog.password);


                // Comparar la contraseña encriptada con la almacenada en ADMIN.json
                if (PW.SequenceEqual(nutritionist.password))
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

        [HttpPost("search")]
        public async Task<IActionResult> searchClient([FromBody] ClientInfo_dto clientinfo)
        {
            var response = new ResponseApi<string>();

            try
            {
                // Construir la ruta del .json
                var filePath = Path.Combine(_env.ContentRootPath, "DataBase", "CLIENTE.json");

                // Leer el contenido del archivo .json
                var jsonData = await System.IO.File.ReadAllTextAsync(filePath);
                var clients = JsonSerializer.Deserialize<List<CLIENTE>>(jsonData) ?? new List<CLIENTE>();

                // Filtrar la lista de nutricionistas por tipocobro
                var client = clients.FirstOrDefault(n =>
                    n.nombre == clientinfo.nombre &&
                    n.apellido1 == clientinfo.apellido1 &&
                    n.apellido2 == clientinfo.apellido2 &&
                    n.email == clientinfo.correo
                );

                if (client == null)
                {
                    response.status = false;
                    response.message = "Usuario no encontrado";

                    return Ok(response); // Enviar error 404 si no se encuentra el cliente
                }

                response.status = true;
                response.message = "Usuario encontrado";
                return Ok(response);

            }
            catch (Exception e)
            {
                response.status = false;
                response.message = e.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response); // Error de servidor
            }
        }

        [HttpPost("associate")]
        public async Task<IActionResult> associateClient([FromBody] AssociateInfo_dto associateInfo)
        {
            var response = new ResponseApi<string>();

            try
            {
                // ------- BUSCAR CLIENTE--------
                // Construir la ruta del .json
                var clientfilePath = Path.Combine(_env.ContentRootPath, "DataBase", "CLIENTE.json");

                // Leer el contenido del archivo .json
                var jsonDataClient = await System.IO.File.ReadAllTextAsync(clientfilePath);
                var clients = JsonSerializer.Deserialize<List<CLIENTE>>(jsonDataClient) ?? new List<CLIENTE>();

                // Buscar el cliente por correo
                var client = clients.FirstOrDefault(c => c.email == associateInfo.client_email);

                if (client == null)
                {
                    response.status = false;
                    response.message = "Cliente no encontrado";

                    return NotFound(response); // Enviar error 404 si no se encuentra el cliente
                }

                // ------- BUSCAR NUTRICIONISTA--------
                // Construir la ruta del .json
                var nutricionistfilePath = Path.Combine(_env.ContentRootPath, "DataBase", "NUTRITIONIST.json");

                // Leer el contenido del archivo .json
                var jsonDataNutri = await System.IO.File.ReadAllTextAsync(nutricionistfilePath);
                var nutritionists = JsonSerializer.Deserialize<List<NUTRITIONIST>>(jsonDataNutri) ?? new List<NUTRITIONIST>();

                // Buscar el nutricionista por correo
                var nutritionist = nutritionists.FirstOrDefault(c => c.email == associateInfo.nutri_email);

                if (nutritionist == null)
                {
                    response.status = false;
                    response.message = "Nutricionista no encontrado";

                    return NotFound(response); // Enviar error 404 si no se encuentra el cliente
                }

                // Asociar cliente con nutricionista
                client.fk_cod_nutricionista = nutritionist.cod_nutricionista;

                // Guardar los cambios en el archivo JSON
                var updatedJsonDataClient = JsonSerializer.Serialize(clients, new JsonSerializerOptions { WriteIndented = true });
                await System.IO.File.WriteAllTextAsync(clientfilePath, updatedJsonDataClient);

                response.status = true;
                response.message = "Cliente asociado con éxito";
                return Ok(response);

            }
            catch (Exception e)
            {
                response.status = false;
                response.message = e.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response); // Error de servidor
            }
        }

        [HttpPost("registerProduct")]
        public async Task<IActionResult> registerProduct([FromBody] RegisterProduct_dto newProduct)
        {
            var response = new ResponseApi<RegisterProduct_dto>();

            try
            {
                // Crear una instancia de CLIENTE con los datos del nuevo cliente
                var product = new PRODUCT
                {
                    cod_barras = newProduct.cod_barras,
                    tamano_porcion = newProduct.tamano_porcion,
                    descripcion = newProduct.descripcion,
                    proteina = newProduct.proteina,
                    nombre = newProduct.nombre,
                    energia = newProduct.energia,
                    carbohidratos = newProduct.carbohidratos,
                    hierro = newProduct.hierro,
                    calcio = newProduct.calcio,
                    vitaminas = newProduct.vitaminas,
                    sodio = newProduct.sodio,
                    grasa = newProduct.grasa
                };

                var filePath = Path.Combine(_env.ContentRootPath, "DataBase", "PRODUCT.json");

                // Leer el contenido actual del archivo .json
                var jsonData = await System.IO.File.ReadAllTextAsync(filePath);
                var products = JsonSerializer.Deserialize<List<PRODUCT>>(jsonData) ?? new List<PRODUCT>();

                // Agregar el nuevo cliente a la lista
                products.Add(product);

                // Serializar la lista actualizada de vuelta al archivo .json
                var updatedJsonData = JsonSerializer.Serialize(products, new JsonSerializerOptions { WriteIndented = true });
                await System.IO.File.WriteAllTextAsync(filePath, updatedJsonData);

                response.status = true;
                response.value = newProduct;
                response.message = "Success";
            }
            catch (Exception e)
            {
                response.status = false;
                response.message = e.Message;
            }

            return Ok(response);
        }
    }
}
