import * as i18next from 'i18next'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import TestRenderer from 'react-test-renderer'
import AnsweringInstructions, { AnsweringInstructionProps } from '../src/components/AnsweringInstructions'
import { initI18n } from '../src/i18n'

describe('<AnsweringInstructions />', () => {
  let i18n: i18next.i18n

  beforeAll(() => {
    i18n = initI18n('fi-FI', null, null)
  })

  describe('question', () => {
    it('numerals', () => {
      assertRendering({
        maxAnswers: 1,
        type: 'question',
        childQuestions: mkQuestions('1.1.', '1.2.', '1.3.', '1.4.', '1.5.', '1.6.', '1.7.', '1.8.', '1.9.', '1.10.')
      })

      assertRendering({
        maxAnswers: 5,
        type: 'question',
        childQuestions: mkQuestions('1.1.', '1.2.', '1.3.', '1.4.', '1.5.', '1.6.', '1.7.', '1.8.', '1.9.', '1.10.')
      })
    })

    it('2 child questions and maxAnswers = 1', () => {
      assertRendering({
        maxAnswers: 1,
        type: 'question',
        childQuestions: mkQuestions('1.1.', '1.2.')
      })
    })

    it('fallback', () => {
      assertRendering({
        maxAnswers: 11,
        type: 'question',
        childQuestions: mkQuestions(
          '1.1.',
          '1.2.',
          '1.3.',
          '1.4.',
          '1.5.',
          '1.6.',
          '1.7.',
          '1.8.',
          '1.9.',
          '1.10.',
          '1.11.',
          '1.12.'
        )
      })
    })
  })

  describe('section', () => {
    it('numerals', () => {
      assertRendering({
        maxAnswers: 1,
        type: 'section',
        childQuestions: mkQuestions('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.')
      })

      assertRendering({
        maxAnswers: 5,
        type: 'section',
        childQuestions: mkQuestions('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.')
      })
    })

    it('2 child questions and maxAnswers = 1', () => {
      assertRendering({
        maxAnswers: 1,
        type: 'section',
        childQuestions: mkQuestions('1.', '2.')
      })
    })

    it('fallback', () => {
      assertRendering({
        minAnswers: 2,
        maxAnswers: 5,
        type: 'section',
        childQuestions: mkQuestions('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.')
      })

      assertRendering({
        maxAnswers: 11,
        type: 'section',
        childQuestions: mkQuestions('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.')
      })
    })
  })

  function assertRendering(props: AnsweringInstructionProps) {
    const container = TestRenderer.create(
      <I18nextProvider i18n={i18n}>
        <AnsweringInstructions {...props} />
      </I18nextProvider>
    )
    expect(container.toJSON()).toMatchSnapshot()
  }

  function mkQuestions(...displayNumbers: string[]): Element[] {
    return displayNumbers.map(displayNumber => {
      const question = document.createElement('question')
      question.setAttribute('display-number', displayNumber)
      return question
    })
  }
})