import * as i18next from 'i18next'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { create } from 'react-test-renderer'
import { QuestionContext } from '../../src/components/QuestionContext'
import ResultsExamQuestionManualScore, {
  ResultsExamQuestionManualScoreProps
} from '../../src/components/results/ResultsExamQuestionManualScore'
import { initI18n } from '../../src/i18n'

const defaultProps = {
  maxScore: 6,
  displayNumber: '1'
}

const defaultScores = {
  pregrading: { score: 1, shortCode: 'PRE' },
  censoring: {
    scores: [
      { score: 4, shortCode: 'SE3' },
      { score: 3, shortCode: 'SE2' },
      { score: 2, shortCode: 'SE1' }
    ]
  },
  inspection: { score: 5, shortCodes: ['IN1', 'IN2'] }
}

describe('<ResultsExamQuestionManualScore />', () => {
  let i18n: i18next.i18n

  describe('fi-FI', () => {
    beforeAll(() => {
      i18n = initI18n('fi-FI', null, null)
    })

    it('renders without score', () => {
      const props = {
        ...defaultProps,
        scores: {}
      }
      expect(renderWithContext(props, []).toJSON()).toMatchSnapshot()
    })

    it('renders with pregrading score', () => {
      const props = {
        ...defaultProps,
        scores: { pregrading: defaultScores.pregrading }
      }
      expect(renderWithContext(props, []).toJSON()).toMatchSnapshot()
    })

    it('renders with pregrading and one censor scores', () => {
      const props = {
        ...defaultProps,
        scores: {
          pregrading: defaultScores.pregrading,
          censoring: { scores: [defaultScores.censoring.scores[0]] }
        }
      }
      expect(renderWithContext(props, []).toJSON()).toMatchSnapshot()
    })

    it('renders with pregrading and three censor scores', () => {
      const props = {
        ...defaultProps,
        scores: {
          pregrading: defaultScores.pregrading,
          censoring: defaultScores.censoring
        }
      }
      expect(renderWithContext(props, []).toJSON()).toMatchSnapshot()
    })

    it('renders with pregrading, censor and inspection scores', () => {
      const props = {
        ...defaultProps,
        scores: defaultScores
      }
      expect(renderWithContext(props, []).toJSON()).toMatchSnapshot()
    })

    it('renders with displayNumber where there are more than one answer', () => {
      const props = {
        ...defaultProps,
        scores: { pregrading: defaultScores.pregrading }
      }
      expect(renderWithContext(props, [{} as Element, {} as Element]).toJSON()).toMatchSnapshot()
    })
  })

  describe('sv-FI', () => {
    beforeAll(() => {
      i18n = initI18n('fi-SV', null, null)
    })

    it('renders with pregrading, censor and inspection scores', () => {
      const props = {
        ...defaultProps,
        scores: defaultScores
      }
      expect(renderWithContext(props, []).toJSON()).toMatchSnapshot()
    })
  })

  const contextProps = {
    answers: [],
    displayNumber: '1',
    hasExternalMaterial: false,
    maxAnswers: 2,
    maxScore: 2,
    level: 2,
    childQuestions: []
  }

  function renderWithContext(props: ResultsExamQuestionManualScoreProps, answers: Element[]) {
    return create(
      <QuestionContext.Provider value={{ ...contextProps, answers }}>
        <I18nextProvider i18n={i18n}>
          <ResultsExamQuestionManualScore {...props} />
        </I18nextProvider>
      </QuestionContext.Provider>
    )
  }
})
