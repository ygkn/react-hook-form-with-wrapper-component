import { FC, useId } from "react";
import { useForm, Controller } from "react-hook-form";
import { object, array, string, boolean, minLength, Output } from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";

import { FieldArray } from "./utils/react-hook-form/FieldArray";
import { Registerer } from "./utils/react-hook-form/Registerer";

const formSchema = object({
  todos: array(
    object({
      title: string([minLength(1, "required")]),
      done: boolean(),
    }),
  ),
});

export const WhenThereIs: FC = () => {
  const { control, formState, handleSubmit, register } = useForm<
    Output<typeof formSchema>
  >({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      todos: [{ title: "牛乳を買う", done: false }],
    },
  });

  const formId = useId();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <fieldset>
        <legend>TODO</legend>
        <FieldArray
          name="todos"
          control={control}
          render={({ append, fields, remove }) => {
            return (
              <>
                <ul
                  style={{
                    display: "grid",
                    gap: "1rem",
                  }}
                >
                  {fields.map((field, index) => {
                    return (
                      <li
                        key={field.id}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto 1fr auto",
                          gap: "0.5rem",
                          alignItems: "start",
                        }}
                      >
                        <Controller
                          name={`todos.${index}.done`}
                          control={control}
                          render={({
                            field: { onChange, value, ...field },
                          }) => {
                            return (
                              <>
                                <input
                                  type="checkbox"
                                  id={`${formId}.todos.${index}.done`}
                                  {...field}
                                  checked={value}
                                  onChange={(e) =>
                                    onChange(e.currentTarget.checked)
                                  }
                                />
                                <label
                                  htmlFor={`${formId}.todos.${index}.done`}
                                  className="visually-hidden"
                                >
                                  完了
                                </label>
                              </>
                            );
                          }}
                        />
                        <Registerer
                          name={`todos.${index}.title`}
                          formState={formState}
                          register={register}
                          render={({ registration, fieldState }) => {
                            return (
                              <div
                                style={{
                                  display: "grid",
                                }}
                              >
                                <label className="visually-hidden">
                                  タイトル
                                </label>
                                <input
                                  type="text"
                                  {...registration}
                                  aria-invalid={fieldState.invalid}
                                />
                                {fieldState.error?.message !== undefined && (
                                  <span>
                                    error: {fieldState.error?.message}
                                  </span>
                                )}
                              </div>
                            );
                          }}
                        />

                        <button
                          type="button"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    append({ title: "", done: false });
                  }}
                >
                  add
                </button>
              </>
            );
          }}
        />
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};
