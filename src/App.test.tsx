import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders search", () => {
    render(<App />);
    const linkElement = screen.getByText(/Search repos.../i);
    expect(linkElement).toBeInTheDocument();
});

test("render an add button", () => {
    render(<App />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
});

test("renders the tables' title", () => {
    render(<App />);
    const linkElement = screen.getByText(/Top 10 Favorite Repositories/i);
    expect(linkElement).toBeInTheDocument();
});

test("renders table ", () => {
    render(<App />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
});
