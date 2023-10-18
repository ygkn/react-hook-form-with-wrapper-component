import { FC, useId } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { object, array, string, boolean, minLength, Output } from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";

const formSchema = object({
  todos: array(
    object({
      title: string([minLength(1, "required")]),
      done: boolean(),
    }),
  ),
});

export const WhenThereIsNot: FC = () => {
  const { control, formState, handleSubmit, register } = useForm<
    Output<typeof formSchema>
  >({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      todos: [{ title: "牛乳を買う", done: false }],
    },
  });

  const formId = useId();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "todos",
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <fieldset>
        <legend>TODO</legend>

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
                  render={({ field: { onChange, value, ...field } }) => {
                    return (
                      <>
                        <input
                          type="checkbox"
                          id={`${formId}.todos.${index}.done`}
                          {...field}
                          checked={value}
                          onChange={(e) => onChange(e.currentTarget.checked)}
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
                <div
                  style={{
                    display: "grid",
                  }}
                >
                  <label className="visually-hidden">タイトル</label>
                  <input
                    type="text"
                    {...register(`todos.${index}.title`)}
                    aria-invalid={
                      formState.errors.todos?.[index]?.title !== undefined
                    }
                  />
                  {formState.errors.todos?.[index]?.title?.message !==
                    undefined && (
                    <span>
                      error: {formState.errors.todos?.[index]?.title?.message}
                    </span>
                  )}
                </div>

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
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};
