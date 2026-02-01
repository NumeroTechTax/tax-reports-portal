import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "@/app/login/page";

describe("LoginPage", () => {
  it("renders the main heading", () => {
    render(<LoginPage />);
    expect(screen.getByRole("heading", { name: /יאללה, נתחיל\?/ })).toBeInTheDocument();
  });

  it("renders the instructions text", () => {
    render(<LoginPage />);
    expect(
      screen.getByText(/רק מקלידים את המייל ומקבלים מיד קוד חד פעמי להתחברות/)
    ).toBeInTheDocument();
  });

  it("renders the email input with label", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/מייל/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
  });

  it("renders Send code button", () => {
    render(<LoginPage />);
    expect(screen.getByRole("button", { name: /שלחו לי קוד/ })).toBeInTheDocument();
  });

  it("renders Google login button", () => {
    render(<LoginPage />);
    expect(screen.getByRole("button", { name: /התחברו עם גוגל/ })).toBeInTheDocument();
  });

  it("renders privacy disclaimer text", () => {
    render(<LoginPage />);
    expect(
      screen.getByText(/הקלדת המייל מהווה הסכמה לתנאי השימוש ומדיניות הפרטיות/)
    ).toBeInTheDocument();
    expect(screen.getByText(/לא נשתמש במידע שלך למטרות שיווק/)).toBeInTheDocument();
  });

  it("updates email input when user types", () => {
    render(<LoginPage />);
    const input = screen.getByLabelText(/מייל/);
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(input).toHaveValue("test@example.com");
  });

  it("submits form when Send code is clicked with email", () => {
    render(<LoginPage />);
    const input = screen.getByLabelText(/מייל/);
    const submitButton = screen.getByRole("button", { name: /שלחו לי קוד/ });
    fireEvent.change(input, { target: { value: "user@test.com" } });
    fireEvent.click(submitButton);
    // Form submit is prevented; no navigation in test. Just verify no throw.
    expect(input).toHaveValue("user@test.com");
  });
});
