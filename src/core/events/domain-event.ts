import { UniqueEntityID } from '../entities/unique-entity-id'

/*
  Contrato que específica uma estrutura de evento de domínio.
  Esses eventos serão classes aqui dentro também.
*/

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityID
}
