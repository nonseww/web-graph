import { useRef } from 'react';
import classes from './FileUploader.module.scss';

interface FileUploaderProps {
  onFileLoad: (content: string) => void;
}

export const FileUploader = ({ onFileLoad }: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      onFileLoad(text);
    };
    reader.readAsText(file);
  };

  return (
    <>
      <button className={classes.btn} onClick={handleClick}>
        Загрузить граф
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".txt"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </>
  );
};
