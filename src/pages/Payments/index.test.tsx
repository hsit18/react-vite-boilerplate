import { describe, expect, test } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "@/tests/test-utils";
import Payments from ".";

describe("Payment page", () => {
  test("payment page rendered", async () => {
    render(<Payments />);
    expect(screen.getByTestId("payment-page")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getAllByTestId('table-loading-row')[0]);
    expect(screen.getAllByRole('row')).toHaveLength(11);
  });
});