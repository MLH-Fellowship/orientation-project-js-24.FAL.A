import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("@react-pdf/renderer", () => ({
  Document: () => <div>Document</div>,
  Image: () => <div>Image</div>,
  Page: () => <div>Page</div>,
  PDFDownloadLink: () => <div>PDFDownloadLink</div>,
  StyleSheet: { create: () => {} },
  Text: () => <div>Text</div>,
  View: () => <div>View</div>,
}));

test("renders main component", () => {
  render(<App />);
  const text = screen.getByText(/Resume Builder/i);
  expect(text).toBeInTheDocument();
});
