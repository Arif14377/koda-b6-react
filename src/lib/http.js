const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8888";

async function http(url, body, opts = {}) {
  // console.log("url: ", url)
  // console.log("body: ", body)
  // console.log("opts", opts)
  const headers = { ...(opts.headers || {}) };
  if (opts.token) {
    headers.Authorization = `Bearer ${opts.token}`;
  }
  if (body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${BASE_URL}${url}`, {
    method: opts.method || (body ? "POST" : "GET"),
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // console.log("res: ", res)

  // cek tipe response
  const contentType = res.headers.get("content-type") || "";
  // parsing hasil fetch, json atau text
  const data = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  
  if (!res.ok) {
    const message =
      typeof data === "object" && data?.message ? data.message : "Request gagal";
    const error = new Error(message);
    console.log(error)
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export default http;
