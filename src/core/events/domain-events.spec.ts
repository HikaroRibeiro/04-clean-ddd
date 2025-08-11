/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'
import { vi } from 'vitest'

/*
    O método "addDomainEvent" espera receber um evento do domínio da aplicação.
    Todo evento que vai acontecer na aplicação e dispare algo em outro sub-domínio...
    precisa ser representado em uma classe.

*/

class CustomAggregateCreated implements DomainEvent {
  ocurredAt: Date

  private aggregate: CustomAggregate

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain events', () => {
  it('should be able to dispatch an listen to events', () => {
    // Função de nome SPY que retorna informações se ela foi chamada ou não.
    const callbackSpy = vi.fn()

    // Subscriber cadastrado(ouvindo o evento de "resposta criada")
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Estou criando uma resposta porém SEM salvar no banco de dados.
    const aggregate = CustomAggregate.create()

    // Estou assegurando que o evento foi criado porém NÃO foi disparado.
    expect(aggregate.domainEvents).toHaveLength(1)

    // Estou salvando a resposta no banco de dados e assim disparando o evento.
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // O subscriber ouve o evento e faz o que precisa ser feito com o dado.
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
