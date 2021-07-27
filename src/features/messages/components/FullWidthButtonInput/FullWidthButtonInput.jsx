import s from './FullWidthButtonInput.module.css';

const submit = 'submit';

export function FullWidthButtonInput({
  type,
  primary = false,
  className,
  ...restProps
}) {
  return (
    <input
      {...restProps}
      type={type === submit ? submit : 'button'}
      className={`${s.button}${primary ? ` ${s.primary}` : ''}`}
    />
  );
}
