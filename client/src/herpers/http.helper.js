export const httpRequest = () => {
  const request = async (url = 'http://localhost:3100/', method = 'GET', body = null, headers = {}) => {
    if (body) {
      body = JSON.stringify(body);
    }

    const res = await fetch(url, {method, body, headers});
    const data = await res.json();

    return data;
  }

  return { request };
}