function customRequestInit(
  token: string | null,
  fields: string[] | object,
  requestMethod: string
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
