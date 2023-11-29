import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeLoading, changeCategory, changeDifficulty, changeType, changeAmount } from '../features/quiz/quizSlice';

export default function Settings({ isShown }) {

  const [categories, setCategories] = useState(null);

  const loading = useSelector(state => state.quiz.quiz.loading)
  const questionCategory = useSelector(state => state.quiz.quiz.questionCategory)
  const questionDifficulty = useSelector(state => state.quiz.quiz.questionDifficulty)
  const questionType = useSelector(state => state.quiz.quiz.questionType)
  const questionAmount = useSelector(state => state.quiz.quiz.amountOfQuestions)

  const dispatch = useDispatch()

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;

    const handleLoadingChange = value => {
      dispatch(changeLoading(value));
    }

    handleLoadingChange(true);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        handleLoadingChange(false);
        setCategories(response.trivia_categories);
      });
  }, [setCategories, dispatch]);

  const handleCategoryChange = event => {
    dispatch(changeCategory(event.target.value));
  }
  const handleDifficultyChange = event => {
    dispatch(changeDifficulty(event.target.value));
  }
  const handleTypeChange = event => {
    dispatch(changeType(event.target.value));
  }
  const handleAmountChange = event => {
    dispatch(changeAmount(event.target.value));
  }

  useEffect(() => {
    if (questionAmount < 1) {
      dispatch(changeAmount(""));
    }
    if (questionAmount > 50) {
      dispatch(changeAmount(""));
    }
  }, [questionAmount, dispatch]);

  if (!loading) {
    return (
      <div className={isShown ? "opacity-1 settings-sections" : "hiddenSettings transition2"}>
        <div>
          <h4 className="settings-texts">Select Category:</h4>
          <div className="d-flex justify-content-center">
            <select className="select" value={questionCategory} onChange={handleCategoryChange}>
              <option value="" key="All" >All</option>
              {categories &&
                categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

      </div>
    );
  }
  if (loading) {
    return (
      <div className="loader mt-1">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}