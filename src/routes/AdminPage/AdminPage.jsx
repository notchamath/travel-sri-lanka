import { addNewLocationToDb } from "../../utils/firebase/firebase.utils";
import { CATEGORIES } from "../../utils/firebase/firebase.utils";

function AdminPage() {

    const fetchData = async (event) => {
        const input = event.target[0].value
        const category = event.target[1].value
        const url = `https://places.googleapis.com/v1/places/${input}`;
        const headers = {
            'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_MAP_KEY,
            'X-Goog-FieldMask': 'id,displayName,location,editorialSummary'
        };
        
        try{
            const res = await fetch(url, {headers});
            const response = await res.json();
            
            await addNewLocationToDb(response, category);

        } catch (e) {
            alert('Error adding item: ' + e.message)
            console.log('ERROR: ' + e);
        }
    }

    const handleSearch = (event) => {
        event.preventDefault();
        fetchData(event);
    }

    return (
        <div className='search'>
            <form onSubmit={handleSearch}>
                <input label='location' type="text" placeholder='Add place by ID'/>
                <select required name="category" id="category-select">
                    <option value={null}>Choose Category</option>
                    {CATEGORIES.map(category => {
                        return <option value={category}>{category}</option>
                    })}
                   
                </select>
                <button type='submit'>Add place</button>
            </form>
        </div>
    )
}



export default AdminPage;