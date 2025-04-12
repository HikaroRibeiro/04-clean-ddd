import { QuestionRepository } from '../repositories/question-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question does not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not Allowed.')
    }

    await this.questionRepository.delete(question)

    return {}
  }
}
