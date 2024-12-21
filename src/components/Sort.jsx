import PropTypes from 'prop-types';

const Sort = ({ onSortChange, activeSort }) => {
  const sortOptions = [
    { value: "price-asc", label: "Сначала дешевые" },
    { value: "price-desc", label: "Сначала дорогие" },
    { value: "rating-desc", label: "По популярности" },
  ];

  return (
    <div className="sort-container flex flex-wrap gap-5 justify-center">
      <span className="sort-label text-sm font-bold text-text-color">Сортировать по:</span>
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`${
            activeSort === option.value
              ? "bg-pink-500 text-white" // Активная кнопка розовая
              : "bg-white text-pink-500" // Неактивная кнопка с розовым текстом
          } border-2 border-pink-500 rounded-lg px-4 py-2 text-sm transition-colors duration-300 hover:bg-pink-500 hover:text-white`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

Sort.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  activeSort: PropTypes.string.isRequired,
};

export default Sort;