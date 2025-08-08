import { WatchedList } from '@/core/entities/watched-list'
import { AnswerAttachment } from './answer-attachment'

/*
    WatchedList<AnswerAttachment> - neste trecho estou informando o 
    tipo de informação que estou mantendo ali dentro.
    Essa watchedlist irá armazenar anexos de várias questões.
*/
export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId.equals(b.answerId)
  }
}
