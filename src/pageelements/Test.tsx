import React, { useEffect, useState } from "react";

//Code for fetching an endpoint from the Backend
const MyComponent: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:2000/hello/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMessage(data.message);
            } catch (error) {
                console.error('An error occurred while fetching the data.', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <h1 className={'blackText'}>Message from the Backend</h1>
            {message ? <p className={'blackText'}>{message}</p> : <p className={'blackText'}>Loading...</p>}
        </div>
    );
};

//Code for POST Request to an endpoint to the Backend
const AddBookForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const url = 'http://localhost:2000/add_books/';
        const data = { title, author };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-CSRFToken': csrftoken  // uncomment this line if you're using CSRF protection
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.text();
            console.log(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <label>
                Author:
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};

function Start() {
    return (
        <>
            <MyComponent/>
            <AddBookForm/>
        </>
    )
}

export default Start