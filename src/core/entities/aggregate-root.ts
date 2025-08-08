import { DomainEvent } from '../events/domain-event'
import { DomainEvents } from '../events/domain-events'
import { Entity } from './entity'

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = []

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  /*
    Método utilizado para pré-disparar os eventos.
    1) Quando a resposta for criado anoto que aquele evento existe;
    2) Chamo o método "addDomainEvent";
    3) Depois de salva no BD este evento anotado;
    4) Será realmente disparado para que os subscriber possam ouvir
        4.1) O método que dispara é o "dispatchAggregateEvents".
  */
  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents() {
    this._domainEvents = []
  }
}
