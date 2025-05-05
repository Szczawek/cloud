export async function uploadReq(file) { 
    const arr = [];
    const size = file.size;
    const chuck = 1024 * 1024
    const lastChuck = Math.ceil(size / chuck);
    
    for(let i = 0; i < lastChuck; i++) {
        const start = chuck * i;
        const end = Math.min(start + chuck,size)
        const scrap = file.slice(start,end);
        
        const form = new FormData();
        form.append("file",scrap);
        
        const options = {
            method:"POST",
            credentails:"include",
            body:form,
         }
        arr.push(fetch(`${process.env.VITE_API_URL}/upload-video`,options));
    }
    const res = await Promise.all(arr);
    return res;
}
