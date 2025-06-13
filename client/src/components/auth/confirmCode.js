export async function confirmCode(code) {
    const options = {
        header: {
            "Content-Type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify(code),
    }
    const res = await fetch(`${process.env.VITE_API_URL}/check-auth`,options);
    if(!res.ok) throw res.status;
}

