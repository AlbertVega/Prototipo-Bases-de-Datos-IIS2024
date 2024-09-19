namespace NutriTEC.Server.Models
{
    public class Client_dto
    {
        public string nombre { get; set; }
        public string apellido1 { get; set; }
        public string apellido2 { get; set; }
        public DateTime nacimiento { get; set; }
        public float peso { get; set; }
        public float IMC { get; set; }
        public string pais { get; set; }
        public int cintura { get; set; }
        public int cuello { get; set; }
        public int caderas { get; set; }
        public float musculo { get; set; }
        public float grasa { get; set; }
        public int calorias { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}