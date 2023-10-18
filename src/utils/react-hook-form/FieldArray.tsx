import { type ReactNode } from "react";

import {
  type FieldArrayPath,
  type FieldValues,
  type UseFieldArrayProps,
  type UseFieldArrayReturn,
  useFieldArray,
} from "react-hook-form";

type Props<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues>,
  TKeyName extends string,
> = UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName> & {
  render: (
    data: UseFieldArrayReturn<TFieldValues, TFieldArrayName, TKeyName>,
  ) => ReactNode;
};

export const FieldArray = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = "id",
>({
  render,
  ...props
}: Props<TFieldValues, TFieldArrayName, TKeyName>): ReactNode => {
  return render(useFieldArray(props));
};
