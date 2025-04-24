
-- 1. Creating Tables with Foreign Keys
CREATE TABLE Authors (
    AuthorID INT AUTO_INCREMENT PRIMARY KEY,
    AuthorName VARCHAR(100)
);

CREATE TABLE Books (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(150),
    AuthorID INT,
    Price DECIMAL(6,2),
    PublishedDate DATE,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID)
);

-- Insert sample data
-- Add more authors
INSERT INTO Authors (AuthorName) VALUES 
('George R.R. Martin'), 
('Brandon Sanderson'), 
('Terry Pratchett'), 
('Suzanne Collins'), 
('Stephen King');

INSERT INTO Books (Title, AuthorID, Price, PublishedDate) 
VALUES 
('Good Omens', 1, 299.99, '2023-06-15'), 
('Coraline', 1, NULL, '2022-10-30'),
('Harry Potter and the Goblet of Fire', 2, 499.50, '2000-07-08'),
('A Game of Thrones', 3, 399.00, '1996-08-06'),
('A Clash of Kings', 3, 420.00, '1998-11-16'),
('A Storm of Swords', 3, 450.00, '2000-08-08'),
('Mistborn: The Final Empire', 4, 385.00, '2006-07-17'),
('The Well of Ascension', 4, 395.00, '2007-08-21'),
('The Hero of Ages', 4, 410.00, '2008-10-14'),
('The Colour of Magic', 5, 260.00, '1983-11-24'),
('Mort', 5, 280.00, '1987-11-12'),
('Reaper Man', 5, 300.00, '1991-05-10'),
('The Hunger Games', 6, 350.00, '2008-09-14'),
('Catching Fire', 6, 365.00, '2009-09-01'),
('Mockingjay', 6, 375.00, '2010-08-24'),
('The Shining', 7, 310.00, '1977-01-28'),
('It', 7, 399.00, '1986-09-15'),
('Carrie', 7, 270.00, '1974-04-05'),
('Harry Potter and the Order of the Phoenix', 2, 550.00, '2003-06-21'),
('Harry Potter and the Half-Blood Prince', 2, 530.00, '2005-07-16');


-- 2. Simple JOIN
SELECT Books.Title, Authors.AuthorName, Books.Price
FROM Books
JOIN Authors ON Books.AuthorID = Authors.AuthorID;

-- 3. ORDER BY and LIMIT
SELECT * FROM Books 
ORDER BY Price DESC 
LIMIT 2;

-- 4. NULL and IS NULL
SELECT * FROM Books WHERE Price IS NULL;

-- 5. Using Functions: NOW(), CONCAT(), LENGTH()
SELECT NOW() AS CurrentDateTime;
SELECT CONCAT(Title, ' by ', AuthorName) AS FullTitle
FROM Books JOIN Authors ON Books.AuthorID = Authors.AuthorID;
SELECT Title, LENGTH(Title) AS TitleLength FROM Books;

-- 6. ENUM for Fixed Values
CREATE TABLE Genres (
    GenreID INT AUTO_INCREMENT PRIMARY KEY,
    GenreName ENUM(
        'Fiction', 'Non-Fiction', 'Fantasy', 'Sci-Fi',
        'Horror', 'Mystery', 'Thriller', 'Romance',
        'Historical', 'Adventure', 'Drama', 'Young Adult',
        'Children', 'Dystopian', 'Classic', 'Biography',
        'Memoir', 'Self-Help', 'Philosophy', 'Poetry'
    )
);

-- Insert sample data into Genres
INSERT INTO Genres (GenreName) VALUES 
('Fiction'), 
('Fantasy'),
('Sci-Fi'),
('Non-Fiction'),
('Horror'),
('Mystery'),
('Thriller'),
('Romance'),
('Historical'),
('Adventure'),
('Drama'),
('Young Adult'),
('Children'),
('Dystopian'),
('Classic'),
('Biography'),
('Memoir'),
('Self-Help'),
('Philosophy'),
('Poetry');

-- 7. Updating with Conditions
UPDATE Books 
SET Price = Price + 50 
WHERE BookID = 3;

-- 8. Deleting Based on a Condition
DELETE FROM Books 
WHERE PublishedDate < '2010-10-30';

-- 9. BETWEEN for Ranges
SELECT * FROM Books 
WHERE Price BETWEEN 200 AND 400;

-- 10. IN for Multiple Match Values
SELECT * FROM Genres 
WHERE GenreName IN ('Fiction', 'Sci-Fi');

SHOW TABLES;
SELECT * FROM Books;
