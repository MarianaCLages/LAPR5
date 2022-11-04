namespace GestArm.Domain.Armazens;

public interface IArmazemService
{
    Task<ArmazemDTO> GetByIdAsync(ArmazemId id);

    //Task<ArmazemDTO> GetByAlphaNumIdAsync(AlphaId id);

    Task<List<ArmazemDTO>> GetByDesignacaoAsync(string designacao);

    Task<List<ArmazemDTO>> GetAllAsync();

    Task<ArmazemDTO> AddAsync(CreatingArmazemDto dto);

    Task<ArmazemDTO> UpdateAsync(ArmazemDTO dto);

    Task<bool> DeleteAsync(ArmazemId id);

    Task<ArmazemDTO> GetByArmazemIdAsync(string armazemId);
}