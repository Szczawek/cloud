export async function catchUserData() {
        const options = {
            credentials:"include",
        }
        const res = await fetch(`${process.env.VITE_API_URL}/auto-login`,options);
        if(!res.ok && res.status != 401) {
            throw res.status;
        }
        const obj = await res.json();
        return obj;
}
