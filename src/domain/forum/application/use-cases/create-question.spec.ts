/* eslint-disable @typescript-eslint/no-unused-vars */
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionRepository = {
  create: async (question: Question) => {},
}

describe('Use Cases Test', () => {
  test('Create a question', async () => {
    const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

    const { question } = await createQuestion.execute({
      authorId: '1',
      title: 'New Question',
      content: 'Question content',
    })
    expect(question.id).toBeTruthy()
  })
})
