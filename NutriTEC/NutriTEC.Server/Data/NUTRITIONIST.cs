namespace NutriTEC.Server.Data
{
    public class NUTRITIONIST
    {
        public required string nombre { get; set; }
        public required string apellido1 { get; set; }
        public required string apellido2 { get; set; }
        public required DateOnly nacimiento { get; set; }
        public required string cedula { get; set; }
        public required string cod_nutricionista { get; set; }
        public required float peso { get; set; }
        public required float IMC { get; set; }
        public required string direccion { get; set; }
        public required string numero_tarjeta { get; set; }
        public required string tipo_cobro { get; set; }
        public required string email { get; set; }
        public required byte[] password { get; set; }
    }
}
