import commonAPI from "./commonAPI";
import serverURL from "./serverURL";

//  to store API: post data from addpurchaselist page to server  in 'product' array 
 export const addPurchase= async (purchaseDetails)=>{
    return await commonAPI('POST',`${serverURL}/purchases`,purchaseDetails)



}

//  viewAPI: view data from server to purchaseList page
export const viewPurchase=async()=>{
    return await commonAPI('GET',`${serverURL}/purchases`)

}

// delete api: to remove a purchase from purchase list page called by Delete button in purchaseListPage

 export const deletePurchase=async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/purchases/${id}`)
}

// update api:to update a purchase from  purchase list page called by EDIT button in purchaseListPage
export const editPurchase=async(id,purchaseDetails)=>{
    return await commonAPI('PUT',`${serverURL}/purchases/${id}`,purchaseDetails)
}

//  viewAPI: view data from server to Edit purchase page 

export const fetchPurchase=async(id)=>{
    return await commonAPI('GET',`${serverURL}/purchases/${id}`)

}