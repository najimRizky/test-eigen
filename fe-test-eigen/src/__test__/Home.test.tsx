import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../pages/page";
import '@testing-library/jest-dom'
import { BrowserRouter, useParams } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Home Page Component", () => {
  it("renders loading state correctly", () => {
    jest.mock("./../hooks/useGetRequest", () => {
      return jest.fn(() => ({
        error: null,
        loading: true,
        response: null
      }));
    });

    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const skeletonComponents = screen.getAllByTestId("card-article-skeleton")

    expect(container).toMatchSnapshot();
    expect(skeletonComponents).toHaveLength(10);
  });

  it("renders error state correctly", async () => {
    jest.mock("./../hooks/useGetRequest", () => {
      return jest.fn(() => ({
        error: new Error("Something went wrong"),
        loading: true,
        response: null
      }));
    });

    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
      expect(screen.getByText("Something Went Wrong")).toBeInTheDocument();
    });
  });

  it("renders data state correctly", async () => {
    const mockResponse = {
      data: {
        articles: [
          {
            source: {
              id: "google-news",
              name: "Google News"
            },
            author: "VIVA.co.id",
            title: "Berita 123",
            description: null,
            url: "https://news.google.com/rss/articles/CBMifGh0dHBzOi8vd3d3LnZpdmEuY28uaWQvZ2F5YS1oaWR1cC9rZXNlaGF0YW4taW50aW0vMTY0MDg4NS1wYWthci1pbWF1LXdhc3BhZGFpLXBhbmRlbWktZGlzZWFzZS14LW1lbWF0aWthbi1kaWJhbmRpbmctY292aWQtMTnSAYABaHR0cHM6Ly93d3cudml2YS5jby5pZC9hbXAvZ2F5YS1oaWR1cC9rZXNlaGF0YW4taW50aW0vMTY0MDg4NS1wYWthci1pbWF1LXdhc3BhZGFpLXBhbmRlbWktZGlzZWFzZS14LW1lbWF0aWthbi1kaWJhbmRpbmctY292aWQtMTk?oc=5",
            urlToImage: null,
            publishedAt: "2023-09-25T06:12:41Z",
            content: null
          },
        ],
      },
      metadata: {
        page: 1,
        totalElement: 1,
        maxPage: 1,
      },
    };

    jest.mock("./../hooks/useGetRequest", () => {
      return jest.fn(() => ({
        error: undefined,
        loading: false,
        response: mockResponse,
      }));
    });

    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
      expect(screen.getByText("Berita 123")).toBeInTheDocument();
    });
  });

  it("can click button See More", () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const buttonSeeMore = screen.getByText("See More");
    expect(buttonSeeMore).toBeInTheDocument();
    buttonSeeMore.click();
    expect(container).toMatchSnapshot();
  });

  it("updates category and country when selected", async () => {
    const { container } = render(<HomePage />);
    
    const countrySelect = screen.getByLabelText("Country:");
  
    userEvent.selectOptions(countrySelect, ["general"]);
  
    await waitFor(() => {
      expect(container).toMatchSnapshot();
      const params = useParams();
      expect(params.country).toBe("general");
    });
  });
});