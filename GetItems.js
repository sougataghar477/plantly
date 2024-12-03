export async function getItems(category) {
    let items = [];
    let error = null;

     
    let loading = true;

    try {
        const response = await fetch(`http://localhost:3000/api/get_items`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        items = category ? data.items.filter(item => item.category === category) : data.items;
    } catch (err) {
        error = err.message;
    } finally {
        loading = false    }

    return { items, error, loading };
}
