import { useState } from 'react';

const useInput = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);

  const onChangeValueHandler = (event) => {
    setValue(event.target.value);
  };

  return [value, onChangeValueHandler];
};

export default useInput;
