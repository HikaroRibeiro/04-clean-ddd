import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug.', async () => {
    /* 
        Tirei o "makeQuestion" e inseri o "Question.create" 
        Originalmente só tinha a parâmetro "slug: Slug.create('example-question'),"
    */
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID(),
      title: 'Example question',
      slug: Slug.create('example-question'),
      content: 'Example content',
    })

    // console.log(newQuestion)

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    /* console.log(`Slug: ${newQuestion.slug.value}`) */

    expect(result.value).toMatchObject({
      question: expect.objectContaining({ title: newQuestion.title }),
    })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({ id: newQuestion.id }),
    })
  })
})
