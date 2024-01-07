import React, { FC, memo, useCallback, useState } from 'react';
import styles from './ParamEditor.module.scss';
import { Input } from '@components/Input';
import { find, map } from 'lodash';

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

  return (
    <form className={styles.root}>
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
    </form>
  );
});
