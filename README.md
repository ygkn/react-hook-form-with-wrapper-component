# React Hook Form with Wrapper Component

React Hook Form でラッパーコンポーネントを使ってみよう

[CodeSandbox](https://codesandbox.io/p/github/ygkn/react-hook-form-with-wrapper-component/main)

React Hook Form では API をラップしたラッパーコンポーネントを作ると便利ということの PoC

- [`useForm` の `register`](https://react-hook-form.com/docs/useform/register) をラップした `Regiserer` コンポーネント [(ソースコード)](src/utils/react-hook-form/Registerer.tsx)
  - [`Controller` コンポーネント](https://react-hook-form.com/docs/usecontroller/controller) を参考に
- [`useFieldArray`](https://react-hook-form.com/docs/usefieldarray) をラップした FieldArray コンポーネント [(ソースコード)](src/utils/react-hook-form/FieldArray.tsx)

ラッパーコンポーネントが…
- あるとき 🤣 [src/WhenThereIs.tsx](src/WhenThereIs.tsx)
- ないとき 😭 [src/WhenThereIsNot.tsx](src/WhenThereIsNot.tsx)