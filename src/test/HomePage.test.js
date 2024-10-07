import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { parseCSV } from "../utils/parseFunction";

jest.mock("../utils/parseFunction", () => ({
  parseCSV: jest.fn(), // Mock de la fonction parseCSV
}));

describe("HomePage", () => {
  test("should call handleFileUpload and set CSV data", async () => {
    const mockCsvText = "header1,header2\nvalue1,value2";
    const mockParsedData = [{ header1: "value1", header2: "value2" }];
    parseCSV.mockReturnValue(mockParsedData);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const fileUploader = screen.getByLabelText(/ajouter un fichier csv/i);
    fireEvent.change(fileUploader, {
      target: {
        files: [new File([mockCsvText], "test.csv", { type: "text/csv" })],
      },
    });

    await waitFor(() => {
      expect(parseCSV).toHaveBeenCalledWith(mockCsvText);
      expect(screen.getByText(/value1/i)).toBeInTheDocument();
      expect(screen.getByText(/value2/i)).toBeInTheDocument();
    });
  });
});
