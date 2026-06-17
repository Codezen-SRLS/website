import * as React from "react";

const FormContext = React.createContext(null);

export function FormProvider({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const openForm = React.useCallback(() => setIsOpen(true), []);
  const closeForm = React.useCallback(() => setIsOpen(false), []);
  return (
    <FormContext.Provider value={{ isOpen, openForm, closeForm }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const ctx = React.useContext(FormContext);
  if (!ctx) throw new Error("useForm must be used inside FormProvider");
  return ctx;
}
