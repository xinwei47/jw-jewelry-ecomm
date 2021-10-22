import '../styles/components/_button.scss';

const Button = (props) => {
  const className = `btn ${props.className}`;

  return (
    <button className={className} onClick={props.onClick} type={props.type}>
      {props.children}
    </button>
  );
};

export default Button;
