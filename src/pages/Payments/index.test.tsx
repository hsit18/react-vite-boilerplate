import { describe, expect, test } from "vitest";
import { render, screen } from "@/tests/test-utils";
import Payments from ".";

describe("Payment page", () => {
  test("payment page rendered", async () => {
    render(<Payments />);
    expect(screen.getByTestId("payment-page")).toBeInTheDocument();
  });
});