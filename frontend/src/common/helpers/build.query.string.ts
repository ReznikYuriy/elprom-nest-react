export const buildQueryString = (
  params: Record<string, string | number> | URLSearchParams | undefined
): string => {
  const query = new URLSearchParams();
  if (params) {
    Object.keys(params).forEach((key) => {
      if (typeof (params as any)[key] !== "boolean" && (params as any)[key] !== "") {
        query.append(key, (params as any)[key].toString());
      }
    });
  }
  return query.toString() && `?${query.toString()}`;
};
