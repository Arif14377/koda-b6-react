const url = "https://raw.githubusercontent.com/Arif14377/koda-b6-react/refs/heads/main/data.json"
async function getData(url) {
    const resp = await fetch(url)
    if(!resp.ok) {
        const err = new Error("HTTP Error", resp.status)
        throw err
    }
    const data = await resp.json()
    return data
}

export const dataFetch = await getData(url)