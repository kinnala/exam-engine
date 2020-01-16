import classNames from 'classnames'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { findChildrenAnswers, getNumericAttribute } from '../../dom-utils'
import { AppState } from '../../store'
import { QuestionContext, withQuestionContext } from '../QuestionContext'
import { ExamAnswer, ExamComponentProps } from '../types'

function ExamQuestionResult({ element, renderChildNodes }: ExamComponentProps) {
  const answers = useSelector((state: AppState) => state.answers.answersById)
  const hasAnswers: boolean = questionHasAnswers(element, answers)
  const { displayNumber, level } = useContext(QuestionContext)

  return !hasAnswers ? null : (
    <div
      className={classNames('exam-question', {
        'e-mrg-b-8 e-clearfix': level === 0,
        'e-mrg-l-8 e-mrg-y-4': level > 0
      })}
      id={displayNumber}
    >
      {renderChildNodes(element)}
    </div>
  )
}

function questionHasAnswers(element: Element, answers: Record<number, ExamAnswer>): boolean {
  const answerElems = findChildrenAnswers(element)
  for (const e of answerElems) {
    const questionId = getNumericAttribute(e, 'question-id')!
    if (answers[questionId]) {
      return true
    }
  }
  return false
}

export default React.memo(withQuestionContext(ExamQuestionResult))