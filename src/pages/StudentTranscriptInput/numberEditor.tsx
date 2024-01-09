import type { RenderEditCellProps } from 'react-data-grid';
import './numberEditor.css'; // Import your CSS file

export const textEditorClassname = 'rdg-text-editor';

function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus();
  input?.select();
}

export default function textEditor<TRow, TSummaryRow>({
  row,
  column,
  onRowChange,
  onClose
}: RenderEditCellProps<TRow, TSummaryRow>) {
  const validateInput = (inputValue: string) => {
    const isInteger = /^\d*$/.test(inputValue);
    if (!isInteger) {
      return false;
    }
    const isEmpty = inputValue === '';
    if (isEmpty) {
      return false;
    }
    const isInRange = +inputValue >= 0 && +inputValue <= 10;
    if (!isInRange) {
      return false;
    }
    return true;
  };
  return (
    <input
      className={textEditorClassname}
      ref={autoFocusAndSelect}
      type='number'
      min={0}
      max={10}
      value={row[column.key as keyof TRow] as unknown as number}
      onChange={event => {
        const inputValue = event.target.value;
        const isValid = validateInput(inputValue); // Replace validateInput with your validation logic

        if (isValid || inputValue === '') {
          onRowChange({ ...row, [column.key]: inputValue });
        }
      }}
      onBlur={() => onClose(true, false)}
    />
  );
}
