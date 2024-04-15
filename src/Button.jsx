const Button = ({ value, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {value}
  </button>
);

export default Button;
