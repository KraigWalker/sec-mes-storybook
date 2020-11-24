import React from 'react';
import GetIcon from './GetIcon';
import { Link } from 'react-router-dom';

export const SecureButton = ({
  name,
  label,
  message,
  description = null,
  onClick,
}) => {
  const finalDescription = description || `${name} ${message.getSubject()}`;
  return (
    <button
      className={`c-btn c-btn--link c-message__summary__head__actions__${name.toLowerCase()} u-no-padding`}
      onClick={onClick}
    >
      <SecureButtonIcon
        description={finalDescription}
        name={name}
        label={label}
      >
        <GetIcon id={`icon-${name.toLowerCase()}`} width="24px" height="24px" />
      </SecureButtonIcon>
    </button>
  );
};

export const SecureButtonIcon = ({ name, description, label, children }) => {
  return (
    <div>
      <span
        id={`${name}Msg`}
        className={`c-message__summary__head__actions__${name.toLowerCase()}__txt`}
        aria-label={`${description}`}
      >
        {label}
      </span>
      <span
        className={`c-message__summary__head__actions__${name.toLowerCase()}__icon`}
      >
        {children}
      </span>
    </div>
  );
};

export const SecureLink = ({
  name,
  label,
  message,
  path,
  backpath,
  description,
  children,
}) => {
  return (
    <Link
      to={{
        pathname: path,
        backPath: backpath,
        messageDetail: message,
      }}
      className={`c-btn c-btn--link c-message__summary__head__actions__${name} u-no-padding`}
    >
      <SecureButtonIcon description={description} name={name} label={label}>
        {children}
      </SecureButtonIcon>
    </Link>
  );
};
