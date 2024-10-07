import React from "react";
import { render, screen } from "@testing-library/react";
import Container from "../components/Container";

describe("Container", () => {
  test("renders children correctly", () => {
    render(
      <Container>
        <div>Child Component</div>
      </Container>
    );

    expect(screen.getByText(/child component/i)).toBeInTheDocument();
  });

  test("applies the correct className", () => {
    const { container } = render(
      <Container>
        <div>Another Child</div>
      </Container>
    );

    expect(container.firstChild).toHaveClass("container");
  });
});
