import React, { useState } from 'react';

const FetchApiUser = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiGet = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("https://randomuser.me/api/?results=10");
            const jsonData = await response.json();
            console.log(jsonData);  
            setData(jsonData.results.slice(0, 10));  
        } catch (error) {
            setError("Error fetching data");
            console.error("Error fetching data: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg text-center my-10">
            <button
                onClick={apiGet}
                className="px-4 py-2 mt-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
            >
                Fetch Api User Information
            </button>
            <br />
            {loading && <p className="text-gray-600">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div>
                {data.map(user => (
                    <div key={user.login.uuid} className="user-card flex items-center border rounded-lg p-4 my-4 bg-gray-100 shadow-md">
                        <div>
                            <img src={user.picture.medium} alt={`${user.name.first} ${user.name.last}`} className="w-20 h-20 rounded-full mr-4" />
                        </div>
                        <div className="user-info flex flex-col">
                            <p className="text-gray-800">ID: {user.login.uuid}</p>
                            <p className="text-gray-800">Name: {user.name.first} {user.name.last}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FetchApiUser;
