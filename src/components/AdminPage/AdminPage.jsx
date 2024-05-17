import React from 'react'

function AdminPage() {

    
    const fetchData = async (input) => {
        const url = `https://places.googleapis.com/v1/places/${input}`;
        const headers = {
            'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_MAP_KEY,
            'X-Goog-FieldMask': '*'
        };
        
        try{
            const res = await fetch(url, {headers});
            const response = await res.json();
            console.log(response)
        } catch (e) {
            console.log('ERROR: ' + e);
        }
    }

    const handleSearch = (event) => {
        event.preventDefault();
        fetchData(event.target[0].value)
    }

    return (
        <div className='search'>
            <form onSubmit={handleSearch}>
                <input label='search' type="text" placeholder='Add place by ID'/>
                <button type='submit'>Add place</button>
            </form>
        </div>
    )
}



export default AdminPage;