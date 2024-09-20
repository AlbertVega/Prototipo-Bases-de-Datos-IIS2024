namespace NutriTEC.Server.Data1
{
    public class ResponseApi<T>
    {
        public bool status { get; set; }
        public T value { get; set; }
        public string message { get; set; }
    }
}
