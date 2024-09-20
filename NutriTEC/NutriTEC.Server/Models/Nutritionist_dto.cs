namespace NutriTEC.Server.Models

{
    public class Nutritionist_dto
    {
        public string nombre { get; set; }
        public string apellido1 { get; set; }
        public string apellido2 { get; set; }
        public DateTime nacimiento { get; set; }
        public string cedula { get; set; }
        public string codnutricionista { get; set; }
        public float peso { get; set; }
        public float IMC { get; set; }
        public string direccion { get; set; }
        public string numerotarjeta { get; set; }
        public string tipocobro { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
