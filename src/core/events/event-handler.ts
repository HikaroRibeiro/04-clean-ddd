/*
  Essa interface define o contrato do subscriber.
*/

export interface EventHandler {
  setupSubscriptions(): void
}
