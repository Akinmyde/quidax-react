import { render, screen } from "@testing-library/react";
import mockData from '../../mockData';
import BookInformation from "../BookInformation";


describe("Books", () => {
    test("should render book information correctly", () => {
        render(<BookInformation book={mockData} />);
        // const numOfPurchases = screen.getByText("The Innovator's Dilemma");
        const title = screen.queryByText(/Ratings:/);
        const genre = screen.queryByText(/Genre/);
        const publisher = screen.queryByText(/Publisher/);
        const tags = screen.queryByText(/Tags/);
        const released = screen.queryByText(/Released/);

        expect(title).toBeInTheDocument();
        expect(genre).toBeInTheDocument();
        expect(publisher).toBeInTheDocument();
        expect(tags).toBeInTheDocument();
        expect(released).toBeInTheDocument();
    })
})