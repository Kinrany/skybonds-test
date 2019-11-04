import * as React from "react";

export interface Props {
  onDateChange(date: string): void;
}

export default function DatePicker(props: Props) {
  const [text, setText] = React.useState("20190101");
  const [lastDate, setLastDate] = React.useState(text);

  const onTextChange = (newText: string) => {
    setText(newText);
    if (newText.match(/\d{8}/)) {
      setLastDate(newText);
      props.onDateChange(newText);
    }
  };

  const incrementDate = () => {
    const newText = (parseInt(lastDate, 10) + 1).toString();
    setText(newText);
    setLastDate(newText);
    props.onDateChange(newText);
  };

  return (
    <span>
      Date:
      <input
        onChange={e => onTextChange(e.target.value)}
        value={text}
        style={{ marginLeft: 5 }}
      />
      <button type="button" onClick={incrementDate} style={{ marginLeft: 5 }}>
        +
      </button>
    </span>
  );
}
