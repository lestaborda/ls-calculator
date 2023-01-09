import './Button.css';

interface ButtonProps {
  label: string;
  operation?: boolean;
  double?: boolean;
  triple?: boolean;
  onClick: (label: string) => void;
}

export const Button = ({
  label,
  operation,
  double,
  triple,
  onClick,
}: ButtonProps) => {
  let classes = 'button ';
  classes += operation ? 'operation' : '';
  classes += double ? 'double' : '';
  classes += triple ? 'triple' : '';

  return (
    <button className={classes} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};
