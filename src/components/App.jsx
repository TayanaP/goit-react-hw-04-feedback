import { useState } from "react"
import {FeedbackOptions} from 'components/FeedbackOptions/FeedbackOptions'
import {Statistics} from 'components/Statistics/Statistics'
import {Section} from 'components/Section/Section'
import { Notification } from "./Notification/Notification"

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const onLeaveFeedback = (option) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    const total = countTotalFeedback();
    return total > 0 ? Math.round((good / total) * 100) : 0;
  };

    return (
      <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
            options={Object.keys(feedback)}
            onLeaveFeedback={onLeaveFeedback}
          />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() ? (
        <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
          ): (
            <Notification message="There is no feedback" />
          )}
        </Section>
        </div>
    );
  };
