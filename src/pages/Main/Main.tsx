import React, { FC } from 'react';
import styles from './Main.module.scss';
import { ParamEditor } from '@compositions/ParamEditor';
import { params, model } from './Main.utils';

type MainProps = {};

const Main: FC<MainProps> = () => {
  return (
    <div className={styles.root}>
      <ParamEditor params={params} model={model} />
    </div>
  );
};

export default Main;
