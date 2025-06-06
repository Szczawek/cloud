async function createCode(data) {
    const options = {
        method:"POST",
        headers: {
            "Content-type":"application/json",
        },
        credentials:"include",
        body: JSON.stringifi(data),
    }
    const res = await fetch(`${process.env.VITE_API_URL}/auth-code`,options);
    if(!res.ok) throw res.status;
}

async function passCode(code) {
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

export {createCode, passCode};
