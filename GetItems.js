export async function getItems(category) {
    let items = [];
    let error = null;

 

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get_items`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        items = category ? data.items.filter(item => item.category === category) : data.items;
    } catch (err) {
        error = err.message;
    }  

    return { items, error };
}
