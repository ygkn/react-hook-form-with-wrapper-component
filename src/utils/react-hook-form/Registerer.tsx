import { type FC, type ReactElement } from "react";

import {
  type FieldPath,
  type FieldValues,
  type FormState,
  type UseFormRegister,
  type UseFormReturn,
  get,
} from "react-hook-form";

const getFieldState = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>(
  name: TFieldName,
  formState: FormState<TFieldValues>,
) => ({
  invalid: get(formState.errors, name) !== undefined,
  isDirty: get(formState.dirtyFields, name) === true,
  isTouched: get(formState.touchedFields, name) === true,
  error: get(formState.errors, name),
});

type Props<
  TFieldValues extends FieldValues,
  Path extends FieldPath<TFieldValues>,
> = {
  name: Path;
  register: UseFormRegister<TFieldValues>;
  formState: FormState<TFieldValues>;
  render: (props: {
    registration: ReturnType<UseFormReturn<TFieldValues>["register"]>;
    fieldState: ReturnType<UseFormReturn<TFieldValues>["getFieldState"]>;
  }) => ReactElement;
};

export const Registerer = <
  TFieldValues extends FieldValues,
  Path extends FieldPath<TFieldValues>,
>({
  formState,
  name,
  register,
  render,
}: Props<TFieldValues, Path>): ReturnType<FC> => {
  const registration = register(name);
  const fieldState = getFieldState(name, formState);

  return render({ registration, fieldState });
};
