namespace GestArm.Domain.Armazens;

public class ArmazemService : IArmazemService
{
    private readonly IArmazemRepository _repository;

    public ArmazemService(IArmazemRepository repository)
    {
        _repository = repository;
    }

    public async Task<ArmazemDTO> GetByIdAsync(ArmazemId id)
    {
        var armazem = await _repository.GetByIdAsync(id);

        if (armazem == null) return null;

        return new ArmazemDTO(armazem.Id.AsGuid(), armazem.Latitude.Graus, armazem.Latitude.Minutos,
            armazem.Latitude.Segundos,
            armazem.Longitude.Graus, armazem.Longitude.Minutos, armazem.Longitude.Segundos,
            armazem.Designacao.Designacao, armazem.Endereco.Rua, armazem.Endereco.NumeroPorta,
            armazem.Endereco.CodigoPostal, armazem.Endereco.Cidade, armazem.Endereco.Pais,
            armazem.AlphaNumId.AlphaNumId);
    }

    public async Task<List<ArmazemDTO>> GetByDesignacaoAsync(string designacao)
    {
        var list = await _repository.GetByDesignacaoAsync(new DesignacaoArmazem(designacao));

        if (list.Count == 0)
        {
            return null;
        }

        var listDto = list.ConvertAll(arm =>
            new ArmazemDTO(arm.Id.AsGuid(), arm.Latitude.Graus, arm.Latitude.Minutos, arm.Latitude.Segundos,
                arm.Longitude.Graus,
                arm.Longitude.Minutos, arm.Longitude.Segundos, arm.Designacao.Designacao, arm.Endereco.Rua,
                arm.Endereco.NumeroPorta, arm.Endereco.CodigoPostal, arm.Endereco.Cidade, arm.Endereco.Pais,
                arm.AlphaNumId.AlphaNumId));

        return listDto;
    }

    public async Task<List<ArmazemDTO>> GetAllAsync()
    {
        var list = await _repository.GetAllAsync();

        var listDto = list.ConvertAll(arm =>
            new ArmazemDTO(arm.Id.AsGuid(), arm.Latitude.Graus, arm.Latitude.Minutos, arm.Latitude.Segundos,
                arm.Longitude.Graus,
                arm.Longitude.Minutos, arm.Longitude.Segundos, arm.Designacao.Designacao, arm.Endereco.Rua,
                arm.Endereco.NumeroPorta, arm.Endereco.CodigoPostal, arm.Endereco.Cidade, arm.Endereco.Pais,
                arm.AlphaNumId.AlphaNumId));

        return listDto;
    }


    public async Task<ArmazemDTO> AddAsync(CreatingArmazemDto dto)
    {
        var armazem = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(dto.LatitudeGrau, dto.LatitudeMinuto, dto.LatitudeSegundo),
            new CoordenadasArmazem(dto.LongitudeGrau, dto.LongitudeMinuto, dto.LongitudeSegundo),
            new DesignacaoArmazem(dto.Designacao),
            new EnderecoArmazem(dto.Rua, dto.NumeroPorta, dto.CodigoPostal, dto.Cidade, dto.Pais),
            new AlphaId(dto.AlphaNumId));

        await _repository.AddAsync(armazem);

        return new ArmazemDTO(armazem.Id.AsGuid(), armazem.Latitude.Graus, armazem.Latitude.Minutos,
            armazem.Latitude.Segundos,
            armazem.Longitude.Graus, armazem.Longitude.Minutos, armazem.Longitude.Segundos,
            armazem.Designacao.Designacao, armazem.Endereco.Rua, armazem.Endereco.NumeroPorta,
            armazem.Endereco.CodigoPostal, armazem.Endereco.Cidade, armazem.Endereco.Pais,
            armazem.AlphaNumId.AlphaNumId);
    }

    public async Task<ArmazemDTO> GetByArmazemIdAsync(string armazemId)
    {
        var armazem = await _repository.GetByArmazemIdAsync(new AlphaId(armazemId));

        if (armazem == null) return null;

        return new ArmazemDTO(armazem.Id.AsGuid(), armazem.Latitude.Graus, armazem.Latitude.Minutos,
            armazem.Latitude.Segundos,
            armazem.Longitude.Graus, armazem.Longitude.Minutos, armazem.Longitude.Segundos,
            armazem.Designacao.Designacao, armazem.Endereco.Rua, armazem.Endereco.NumeroPorta,
            armazem.Endereco.CodigoPostal, armazem.Endereco.Cidade, armazem.Endereco.Pais,
            armazem.AlphaNumId.AlphaNumId);
    }

    public async Task<ArmazemDTO> UpdateAsync(ArmazemDTO dto)
    {
        var armazem = await _repository.GetByIdAsync(new ArmazemId(dto.Id));

        if (armazem == null)
            return null;

        await _repository.RemoveAsync(armazem);

        // change all field
        armazem.ChangeDesignacao(dto.Designacao);
        armazem.ChangeLatitude(dto.LatitudeGrau, dto.LatitudeMinuto, dto.LatitudeSegundo);
        armazem.ChangeLongitude(dto.LongitudeGrau, dto.LongitudeMinuto, dto.LongitudeSegundo);
        armazem.ChangeEndereco(dto.Rua, dto.NumeroPorta, dto.CodigoPostal, dto.Cidade, dto.Pais);

        await _repository.AddAsync(armazem);

        return new ArmazemDTO(armazem.Id.AsGuid(), armazem.Latitude.Graus, armazem.Latitude.Minutos,
            armazem.Latitude.Segundos,
            armazem.Longitude.Graus, armazem.Longitude.Minutos, armazem.Longitude.Segundos,
            armazem.Designacao.Designacao, armazem.Endereco.Rua, armazem.Endereco.NumeroPorta,
            armazem.Endereco.CodigoPostal, armazem.Endereco.Cidade, armazem.Endereco.Pais,
            armazem.AlphaNumId.AlphaNumId);
    }

    public async Task<bool> DeleteAsync(ArmazemId id)
    {
        var armazem = await _repository.GetByIdAsync(id);

        if (armazem == null)
            return false;

        await _repository.RemoveAsync(armazem);

        return true;
    }
}