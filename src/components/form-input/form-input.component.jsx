import { Group, FormInputLabel, FormInputField } from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <FormInputField {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
      )}
    </Group>
  )
}

export default FormInput;
