import React, { useState } from 'react';

import './seniorityFilter.scss';

export const SeniorityFilter = () => {
  const [seniority, setSeniority] = useState('all');

  const handleSeniorityChange = (event: { target: { value: string } }) => {
    setSeniority(event.target.value);
  };

  return (
    <div className="seniorityFilter">
      <div className="seniorityFilter__title">В корусе</div>
      <div className="seniorityFilter__inputs">
        <div className="seniorityFilter__input">
          <label
            className={`${seniority === 'all' ? 'seniorityFilter__label label-checked' : 'seniorityFilter__label'}`}
          >
            <input
              className="radio-button"
              type="radio"
              value="all"
              onChange={handleSeniorityChange}
              checked={seniority === 'all'}
            />
            Все стажи
          </label>
        </div>
        <div className="seniorityFilter__input">
          <label
            className={`${
              seniority === 'lessOneYear' ? 'seniorityFilter__label label-checked' : 'seniorityFilter__label'
            }`}
          >
            <input
              className="radio-button"
              type="radio"
              value="lessOneYear"
              onChange={handleSeniorityChange}
              checked={seniority === 'lessOneYear'}
            />
            &lt; 1 года
          </label>
        </div>
        <div className="seniorityFilter__input">
          <label
            className={`${
              seniority === 'fromOnToThree' ? 'seniorityFilter__label label-checked' : 'seniorityFilter__label'
            }`}
          >
            <input
              className="radio-button"
              type="radio"
              value="fromOnToThree"
              onChange={handleSeniorityChange}
              checked={seniority === 'fromOnToThree'}
            />
            1 - 3 года
          </label>
        </div>
        <div className="seniorityFilter__input">
          <label
            className={`${
              seniority === 'fromThreeToFive' ? 'seniorityFilter__label label-checked' : 'seniorityFilter__label'
            }`}
          >
            <input
              className="radio-button"
              type="radio"
              value="fromThreeToFive"
              onChange={handleSeniorityChange}
              checked={seniority === 'fromThreeToFive'}
            />
            3 - 5 лет
          </label>
        </div>
        <div className="seniorityFilter__input">
          <label
            className={`${
              seniority === 'moreFiveYears' ? 'seniorityFilter__label label-checked' : 'seniorityFilter__label'
            }`}
          >
            <input
              className="radio-button"
              type="radio"
              value="moreFiveYears"
              onChange={handleSeniorityChange}
              checked={seniority === 'moreFiveYears'}
            />
            &gt; 5 лет
          </label>
        </div>
      </div>
    </div>
  );
};
