namespace GestArm.Domain.Armazens;

public class ArmazemDtoParser
{
    public static ArmazemDTO convertToDto(Armazem armazem)
    {
        return new ArmazemDTO(armazem.Id,armazem.Latitude.Graus,armazem.Latitude.Minutos,armazem.Latitude.Segundos,
            armazem.Longitude.Graus,armazem.Longitude.Minutos,armazem.Longitude.Segundos,
            armazem.Designacao.Designacao,armazem.Endereco.Rua,armazem.Endereco.NumeroPorta,armazem.Endereco.CodigoPostal,
            armazem.Endereco.Cidade,armazem.Endereco.Pais,armazem.AlphaNumId.AlphaNumId);
    }
}