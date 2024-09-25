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
<<<<<<< HEAD
  const linkElement = screen.getByText(/resume builder/i);
  expect(linkElement).toBeInTheDocument();
=======
  const text = screen.getByText(/Resume Builder/i);
  expect(text).toBeInTheDocument();
>>>>>>> 66bc6413e19a4573006fc347f83be24a98c579ff
});
