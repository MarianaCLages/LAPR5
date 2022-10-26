namespace GestArm.Domain.Armazens
{
    public class CreatingArmazemDto
    {

        public ArmazemId Id { get; set; }

        public string LatitudeGrau { get; private set; }

        public string LatitudeSegundo { get; private set; }

        public string LatitudeMinuto { get; private set; }

        public string LongitudeGrau { get; private set; }
        public string LongitudeSegundo { get; private set; }
        public string LongitudeMinuto { get; private set; }

        public string Designacao { get; private set; }

        public String Rua { get; private set; }

        public String NumeroPorta { get; private set; }

        public String CodigoPostal { get; private set; }

        public String Cidade { get; private set; }

        public String Pais { get; private set; }



        public CreatingArmazemDto(string latitudeGrau, string latitudeMinuto, string latitudeSegundo, string longitudeGrau, string longitudeMinuto, string longitudeSegundo, String designacao, String rua, String numeroPorta, String codigoPostal, String cidade, String pais)
        {
            LatitudeGrau = latitudeGrau;
            LatitudeMinuto = latitudeMinuto;
            LatitudeSegundo = latitudeSegundo;
            LongitudeGrau = longitudeGrau;
            LongitudeMinuto = longitudeMinuto;
            LongitudeSegundo = longitudeSegundo;
            Designacao = designacao;
            Rua = rua;
            NumeroPorta = numeroPorta;
            CodigoPostal = codigoPostal;
            Cidade = cidade;
            Pais = pais;
        }
    }
}