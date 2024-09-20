using System.Security.Cryptography;
using System.Text;

namespace NutriTEC.Server.Utility
{
    public class PWEncryption
    {
        /*
         * SHA256Encoding
         * Entradas: string PW
         * Salidas: byte[]
         * Este Metodo recibe un string y lo convierte en un arreglo de bytes encriptado con SHA256
         */
        public static byte[] SHA256Encoding(string PW)
        {
            using (SHA256 sHA256 = SHA256.Create())
            {
                byte[] result = sHA256.ComputeHash(Encoding.UTF8.GetBytes(PW));



                return result;
            }
        }

        public static string SHA256Decode(byte[] PW)
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < PW.Length; i++)
            {
                sb.Append(PW[i].ToString("x2"));
            }

            return sb.ToString();
        }
    }
}