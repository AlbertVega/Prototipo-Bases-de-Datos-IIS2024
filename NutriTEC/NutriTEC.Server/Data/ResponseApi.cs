namespace NutriTEC.Server.Data
{
    public class ResponseApi<T>
    {
        public bool status { get; set; }
        public T value { get; set; }
        public string message { get; set; }
    }
}
