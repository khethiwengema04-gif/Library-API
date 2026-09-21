export interface Author {
    id: number;
    name: string;
    email: string;
}

export interface Book {
    id: number;
    title: string;
    authorId: number;
    year: number;
}

// Global In-Memory State
// export let authors: Author[] = [
//     { id: 1, name: "Khethiwe Ngema", email: "khethy@gmail.com" },
//     { id: 2, name: "Amanda Khuzwayo", email: "amanda@gmail.com" }
// ];

export let books: Book[] = [
    { id: 1, title: "Blind Child", authorId: 1, year: 2026 },
    { id: 2, title: "Developer", authorId: 1, year: 2027 }
];

// Helper methods to modify mutable state
// export const updateAuthorsArray = (newAuthors: Author[]) => { authors = newAuthors; };
export const updateBooksArray = (newBooks: Book[]) => { books = newBooks; };
