import React, { useState } from 'react';
import FeedbackOptions from './components/FeedbackOptions.jsx';
import Statistics from './components/Statistics.jsx';
import Section from './components/Section.jsx';
import Notification from './components/Notification.jsx';//+


function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const handleFeedback = (type) => {
    setFeedback(prevState => ({
      ...prevState,
      [type]: prevState[type] + 1
    }));
  };

  const countTotalFeedback = () => {
    return Object.values(feedback).reduce((acc, value) => acc + value, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total === 0 ? 0 : Math.round((feedback.good / total) * 100);
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div className="App">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={handleFeedback}
        />
      </Section>

      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </div>
  );
}

export default App;