Flights Booking Website-

Introduction-

I designed a website to support a manager side and a client side, including aviaition companies and customers.
The basics idea is to allow aviation companies to register flights to the database, and allow customers to
query the database for available flights and book them.
Both type of clients can make changes to bookings, delete, update, etc.


User interface & Database server information-

For server side, i used Django and SQLite3.
For user interface and connectivity to server, i used HTML/CSS, Mui, React-Router, JavaScript, Axios, Redux, JWT.


Every model created with a complete CRUDE:
    GET BY ID
    GET ALL
    ADD
    UPDATE
    REMOVE/DELETE

Each model has unique querys from the server as well.
For example Flights model has also:
Get Flights By Destination And Origin
Get Flights For A Specific Customer
Get Flights By Specific company
