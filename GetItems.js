export async function getItems(category){
    let items=[];
    let error=null;
    let loading=false;
    try{
      loading=true;  
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get_items`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      items = await response.json();
      items=category?items.items.filter(item => item.category===category):items.items;
      loading=false;
    }
    catch(err){
      error=err.message;
    }
   
    return {items,error,loading}
}