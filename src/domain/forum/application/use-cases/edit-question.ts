import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question does not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not Allowed.')
    }

    // console.log(`Edit Question Step 3: ${title} - ${content}`)

    question.title = title
    question.content = content

    // console.log(`Edit Question Step 4: ${question.title} - ${question.content}`)

    await this.questionRepository.save(question)

    return { question }
  }
}
