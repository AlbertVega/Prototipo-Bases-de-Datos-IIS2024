namespace NutriTEC.Server.Data
{
    public class CLIENTE
    {
        public required string nombre { get; set; }
        public required string apellido1 { get; set; }
        public required string apellido2 { get; set; }
        public required DateOnly nacimiento { get; set; }
        public required float peso { get; set; }
        public required float IMC { get; set; }
        public required string pais { get; set; }
        public required int cintura { get; set; }
        public required int cuello { get; set; }
        public required int caderas { get; set; }
        public required float musculo { get; set; }
        public required float grasa { get; set; }
        public required int calorias { get; set; }
        public required string email { get; set; }
        public required byte[] password { get; set; }
    }
}
