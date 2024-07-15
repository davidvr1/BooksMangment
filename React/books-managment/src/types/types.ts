export interface Author {
    id: number;
    name: string;
  }
  
  export interface Series {
    id: number;
    name: string;
  }
  
  export interface Book {
    id: number;
    title: string;   
    series: Series;
    authors: Author[];
  }

  export interface IAddBook {
    title: string;   
    series: string;
    authorName: string;
  }
  
  export interface SearchResult {
    authorSearched: string;
    totalBooksFound: number;
    books: Book[];
  }

  export interface UpdateBookProps {
    book: Book,
    onUpdate: (updatedBook: IAddBook) => void;
  }


  export interface DeleteBookProps {
    name: string;
    onDelete: () => void;
  }