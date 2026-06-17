import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import RequestForm from "../components/RequestForm";
import { FormProvider } from "../context/FormContext";
import { useForm } from "../context/FormContext";

const OpenFormButton = () => {
  const { openForm } = useForm();
  return <button onClick={openForm}>Open</button>;
};

const TestWrapper = () => (
  <FormProvider>
    <OpenFormButton />
    <RequestForm />
  </FormProvider>
);

test("form is hidden by default", () => {
  render(<TestWrapper />);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("form opens when openForm is called", () => {
  render(<TestWrapper />);
  fireEvent.click(screen.getByText("Open"));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("form has required name and email fields", () => {
  render(<TestWrapper />);
  fireEvent.click(screen.getByText("Open"));
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test("form closes when close button is clicked", () => {
  render(<TestWrapper />);
  fireEvent.click(screen.getByText("Open"));
  fireEvent.click(screen.getByLabelText(/close/i));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("form closes on Esc key", () => {
  render(<TestWrapper />);
  fireEvent.click(screen.getByText("Open"));
  fireEvent.keyDown(window, { key: "Escape" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("shows success state after submit", async () => {
  render(<TestWrapper />);
  fireEvent.click(screen.getByText("Open"));

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Alice" } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "alice@example.com" } });

  await act(async () => {
    fireEvent.click(screen.getByText(/submit your request/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/request received/i)).toBeInTheDocument();
  });
});
