import React from "react";
import { Button } from 'web-ui-components/lib/atoms/buttons';

const SecondaryButton = ({ name, onClick }) => (
  <Button display="secondary" onClick={onClick} width='narrow'> {name}</Button>
);

export default SecondaryButton;