import './Display.css';

interface DisplayProps {
  value: string;
}

export const Display = ({ value }: DisplayProps) => {
  return <div className='display'>{value}</div>;
};
