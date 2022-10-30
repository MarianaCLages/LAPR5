using GestArm.Domain.Shared;

namespace GestArm.Domain.Armazens;

public class IArmazemService
{
    private readonly IArmazemRepository _repository;

    public IArmazemService(IArmazemRepository repository)
    {
        _repository = repository;
    }

    public async Task<ArmazemDTO> GetByIdAsync(ArmazemId id)
    {
        var armazem = await _repository.GetByIdAsync(id);

        if (armazem == null) return null;

        return new ArmazemDTO(armazem.Id, armazem.Latitude.Graus, armazem.Latitude.Minutos, armazem.Latitude.Segundos,
            armazem.Longitude.Graus, armazem.Longitude.Minutos, armazem.Longitude.Segundos,
            armazem.Designacao.ToString(), armazem.Endereco.Rua, armazem.Endereco.NumeroPorta,
            armazem.Endereco.CodigoPostal, armazem.Endereco.Cidade, armazem.Endereco.Pais,armazem.AlphaNumId.ToString());
    }

    public async Task<ArmazemDTO> GetByAlphaNumIdAsync(AlphaId id){

        var armazem = await _repository.GetByAlphaNumIdAsync(id);

        if (armazem == null) return null;

        return new ArmazemDTO(armazem.Id, armazem.Latitude.Graus, armazem.Latitude.Minutos, armazem.Latitude.Segundos,
            armazem.Longitude.Graus, armazem.Longitude.Minutos, armazem.Longitude.Segundos,
            armazem.Designacao.ToString(), armazem.Endereco.Rua, armazem.Endereco.NumeroPorta,
            armazem.Endereco.CodigoPostal, armazem.Endereco.Cidade, armazem.Endereco.Pais,armazem.AlphaNumId.ToString());

    }
    public async Task<ArmazemDTO> GetByDesignacaoAsync(DesignacaoArmazem designacao)
    {
        var armazem = await _repository.GetByDesignacaoAsync(designacao);

        if (armazem == null) return null;

        return new ArmazemDTO(armazem.Id, armazem.Latitude.Graus, armazem.Latitude.Minutos, armazem.Latitude.Segundos,
            armazem.Longitude.Graus, armazem.Longitude.Minutos, armazem.Longitude.Segundos,
            armazem.Designacao.ToString(), armazem.Endereco.Rua, armazem.Endereco.NumeroPorta,
            armazem.Endereco.CodigoPostal, armazem.Endereco.Cidade, armazem.Endereco.Pais,armazem.AlphaNumId.ToString());
    }

    public async Task<List<ArmazemDTO>> GetAllAsync()
    {
        var list = await _repository.GetAllAsync();

        var listDto = list.ConvertAll(arm =>
            new ArmazemDTO(arm.Id, arm.Latitude.Graus, arm.Latitude.Minutos, arm.Latitude.Segundos, arm.Longitude.Graus,
                arm.Longitude.Minutos, arm.Longitude.Segundos, arm.Designacao.ToString(), arm.Endereco.Rua,
                arm.Endereco.NumeroPorta, arm.Endereco.CodigoPostal, arm.Endereco.Cidade, arm.Endereco.Pais,arm.AlphaNumId.ToString()));

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

        return new ArmazemDTO(armazem.Id, armazem.Latitude.Graus, armazem.Latitude.Minutos, armazem.Latitude.Segundos,
            armazem.Longitude.Graus, armazem.Longitude.Minutos, armazem.Longitude.Segundos,
            armazem.Designacao.ToString(), armazem.Endereco.Rua, armazem.Endereco.NumeroPorta,
            armazem.Endereco.CodigoPostal, armazem.Endereco.Cidade, armazem.Endereco.Pais,armazem.AlphaNumId.ToString());
    }

    public async Task<bool> RemoveAsync(ArmazemId id)
    {
        var armazem = _repository.GetByIdAsync(id);

        if (armazem != null)
        {
            await _repository.RemoveAsync(id);
            return true;
        }

        throw new ArmazemNotFoundExeption("Não existe nenhum Armazem com esse ID!");
    }
    
    public async Task<ArmazemDTO> GetByArmazemIdAsync(string armazemId)
    {
        var armazem = await _repository.GetByArmazemIdAsync(new AlphaId(armazemId));

        if (armazem == null) return null;

        return new ArmazemDTO(armazem.Id, armazem.Latitude.Graus, armazem.Latitude.Minutos, armazem.Latitude.Segundos,
            armazem.Longitude.Graus, armazem.Longitude.Minutos, armazem.Longitude.Segundos,
            armazem.Designacao.ToString(), armazem.Endereco.Rua, armazem.Endereco.NumeroPorta,
            armazem.Endereco.CodigoPostal, armazem.Endereco.Cidade, armazem.Endereco.Pais,armazem.AlphaNumId.ToString());
    }
    
}