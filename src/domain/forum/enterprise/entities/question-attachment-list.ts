import { WatchedList } from '@/core/entities/watched-list'
import { QuestionAttachment } from './question-attachment'

/*
    WatchedList<QuestionAttachment> - neste trecho estou informando o 
    tipo de informação que estou mantendo ali dentro.
    Essa watchedlist irá armazenar anexos de várias questões.
*/
export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
