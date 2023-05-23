const DetailsButton = ({ buttonLabel, clickHandler }) => {
  return (
    <button type="button" onClick={clickHandler}>
      {buttonLabel}
    </button>
  );
};

export default DetailsButton;
