import React, { FC, memo } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';

type DefaultInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps = {
  label?: string;
  className?: string;
  isRowDirection?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string | undefined,
    id: number,
  ) => void;
} & Omit<DefaultInput, 'onChange'>;

export const Input: FC<InputProps> = memo(
  ({ label, isRowDirection, className, onChange, ...props }) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e, e.target.value, Number(e.target.id));
    };

    return (
      <label
        className={classNames(styles.root, className, {
          [styles.isRowDirection]: isRowDirection,
        })}
      >
        {label && <p>{label}</p>}
        <input className={styles.input} onChange={onChangeHandler} {...props} />
      </label>
    );
  },
);
