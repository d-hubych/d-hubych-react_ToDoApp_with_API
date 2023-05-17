const BASE_URL = 'https://mate.academy/students-api';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: {} | null = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  const requestOnServer = async () => {
    await wait(300);

    const response = await fetch(BASE_URL + url, options);

    if (!response.ok) {
      throw new Error('Something went wrong with the request to the server');
    }

    return response.json();
  };

  return requestOnServer();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: {}) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: {}) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
