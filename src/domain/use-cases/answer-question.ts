/* eslint-disable no-useless-constructor */
import { Answer } from '../entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

/* eslint-disable @typescript-eslint/no-unused-vars */
interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  contentAnswer: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    contentAnswer,
  }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content: contentAnswer,
      authorId: instructorId,
      questionId,
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
