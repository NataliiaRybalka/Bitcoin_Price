export const httpRequest = () => {
  const request = async (url, method = 'GET', body = null, headers = {}) => {
    const res = await fetch(url, {method, body, headers});
    const data = await res.json();

    return data;
  }

  return { request };
}