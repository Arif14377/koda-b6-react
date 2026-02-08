export async function getData(url) {
    const resp = await fetch(url)
    if(!resp.ok) {
        throw new Error("HTTP Error", resp.status)
    }
    return await resp.json()
}