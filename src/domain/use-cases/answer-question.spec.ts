/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {},
}

describe('Teste 1', () => {
  test('Create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

    const answer = await answerQuestion.execute({
      content: 'Nova resposta',
      instructorId: '1',
      questionId: '1',
    })
    expect(answer.content).toEqual('Nova resposta')
  })
})
