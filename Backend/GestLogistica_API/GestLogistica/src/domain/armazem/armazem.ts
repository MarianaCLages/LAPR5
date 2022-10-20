import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { CoordenadasArmazem } from "./coordenadasArmazem";
import { DesignacaoArmazem } from "./designacaoArmazem";
import { EnderecoArmazem } from "./enderecoArmazem";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";


interface ArmazemProps {
  endereco: EnderecoArmazem;
  designacao: DesignacaoArmazem;
  coordenadas: CoordenadasArmazem;
}


export class Armazem extends AggregateRoot<ArmazemProps> {

  get id(): UniqueEntityID{
    return this._id;
  }

  get endereco (): EnderecoArmazem{
    return this.props.endereco;
  }

  get designacao (): DesignacaoArmazem{
    return this.props.designacao
  }

  get coordenadas (): CoordenadasArmazem{
    return this.props.coordenadas;
  }

  private constructor (props: ArmazemProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: ArmazemProps, id?: UniqueEntityID): Result<Armazem> {

    const guardedProps = [
      { argument: props.coordenadas, argumentName: 'coordenadas' },
      { argument: props.designacao, argumentName: 'designacao' },
      { argument: props.endereco, argumentName: 'endereco' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Armazem>(guardResult.message)
    }     
    else {
      const user = new Armazem({
        ...props
      }, id);

      return Result.ok<Armazem>(user);
    }
  }
 

}
