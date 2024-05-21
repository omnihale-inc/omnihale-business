function customRequestInit(
  token: string | null,
  requestMethod: string,
  fields?: string[] | object
): RequestInit {
  return {
    method: requestMethod,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  };
}

export default customRequestInit;
