import React, { FC, memo, useCallback, useState } from 'react';
import styles from './ParamEditor.module.scss';
import { Input } from '@components/Input';
import { find, map, reduce } from 'lodash';

interface Param {
  id: number;
  name: string;
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}

interface Color {
  id: number;
  name: string;
  value: string;
}

export const ParamEditor: FC<Props> = memo(({ params, model }) => {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [fields, setFields] = useState(
    map(params, (param) => ({
      ...param,
      value: find(model.paramValues, (i) => i.paramId === param.id)?.value,
    })),
  );

  const onChangeHandler = useCallback(
    (
      _: React.ChangeEvent<HTMLInputElement>,
      value: string | undefined,
      id: number,
    ) => {
      setFields((prev) =>
        map(prev, (field) =>
          field.id === Number(id)
            ? {
                ...field,
                value: value,
              }
            : field,
        ),
      );
    },
    [],
  );

  const toggleIsOpenModel = () => setIsOpenModel((prev) => !prev);

  return (
    <form className={styles.root}>
      <button onClick={toggleIsOpenModel} type="button">
        {isOpenModel ? 'Show model' : 'Hide model'}
      </button>
      {map(fields, (i) => (
        <Input
          key={i.id}
          id={String(i.id)}
          label={i.name}
          value={i.value}
          onChange={onChangeHandler}
          className={styles.input}
          isRowDirection
        />
      ))}
      {isOpenModel && <pre>{JSON.stringify(fields, null, 2)}</pre>}
    </form>
  );
});
