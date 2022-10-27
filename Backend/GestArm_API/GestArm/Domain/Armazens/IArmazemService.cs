using System.Threading.Tasks;
using System.Collections.Generic;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Armazens
{

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

            if (armazem == null)
            {
                return null;
            }

            return new ArmazemDTO(armazem.Id, armazem.Latitude.Graus.ToString(), armazem.Latitude.Minutos.ToString(), armazem.Latitude.Segundos.ToString(), armazem.Longitude.Graus.ToString(), armazem.Longitude.Minutos.ToString(), armazem.Longitude.Segundos.ToString(), armazem.Designacao.ToString(), armazem.Endereco.Rua,armazem.Endereco.NumeroPorta.ToString(),armazem.Endereco.CodigoPostal,armazem.Endereco.Cidade,armazem.Endereco.Pais);
        }

        public async Task<List<ArmazemDTO>> GetAllAsync()
        {
            var list = await this._repository.GetAllAsync();
            
            List<ArmazemDTO> listDto = list.ConvertAll<ArmazemDTO>(arm => 
                new ArmazemDTO(arm.Id, arm.Latitude.Graus.ToString(), arm.Latitude.Minutos.ToString(), arm.Latitude.Segundos.ToString(), arm.Longitude.Graus.ToString(), arm.Longitude.Minutos.ToString(), arm.Longitude.Segundos.ToString(), arm.Designacao.ToString(), arm.Endereco.Rua,arm.Endereco.NumeroPorta.ToString(),arm.Endereco.CodigoPostal,arm.Endereco.Cidade,arm.Endereco.Pais));
        
            return listDto;
        }


        public async Task<ArmazemDTO> AddAsync(CreatingArmazemDto dto)
        {
            var armazem = new Armazem(new ArmazemId(Guid.NewGuid()), new CoordenadasArmazem( Int16.Parse(dto.LatitudeGrau),Int16.Parse(dto.LatitudeMinuto),Int16.Parse(dto.LatitudeSegundo)), new CoordenadasArmazem(Int16.Parse(dto.LongitudeGrau),Int16.Parse(dto.LongitudeMinuto),Int16.Parse(dto.LongitudeSegundo)), new DesignacaoArmazem( dto.Designacao),new EnderecoArmazem(dto.Rua,Int16.Parse(dto.NumeroPorta),dto.CodigoPostal,dto.Cidade,dto.Pais));

            await _repository.AddAsync(armazem);

            return new ArmazemDTO(armazem.Id, armazem.Latitude.Graus.ToString(), armazem.Latitude.Minutos.ToString(), armazem.Latitude.Segundos.ToString(), armazem.Longitude.Graus.ToString(), armazem.Longitude.Minutos.ToString(), armazem.Longitude.Segundos.ToString(), armazem.Designacao.ToString(), armazem.Endereco.Rua,armazem.Endereco.NumeroPorta.ToString(),armazem.Endereco.CodigoPostal,armazem.Endereco.Cidade,armazem.Endereco.Pais);
        }

        public async Task<bool> RemoveAsync(ArmazemId id)
        {
            var armazem = _repository.GetByIdAsync(id);

            if (armazem != null)
            {
                await _repository.RemoveAsync(id);
                return true;
            }
            else
            {
                throw new ArmazemNotFoundExeption("Não existe nenhum Armazem com esse ID!");
            }
        }
    }

}