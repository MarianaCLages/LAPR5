namespace GestArm.Domain.Armazens
{
    public class CreatingArmazemDto
    {


        public int LatitudeGrau { get; private set; }

        public int LatitudeSegundo { get; private set; }

        public int LatitudeMinuto { get; private set; }

        public int LongitudeGrau { get; private set; }
        public int LongitudeSegundo { get; private set; }
        public int LongitudeMinuto { get; private set; }

        public string Designacao { get; private set; }

        public String Rua { get; private set; }

        public int NumeroPorta { get; private set; }

        public String CodigoPostal { get; private set; }

        public String Cidade { get; private set; }

        public String Pais { get; private set; }



        public CreatingArmazemDto(int latitudeGrau, int latitudeMinuto, int latitudeSegundo, int longitudeGrau, int longitudeMinuto, int longitudeSegundo, String designacao, String rua, int numeroPorta, String codigoPostal, String cidade, String pais)
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