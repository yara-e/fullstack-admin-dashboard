export interface DecodedCursor {
  id: number;
  createdAt: Date;
}

export const encodeCursor = (data: DecodedCursor): string => {
  return Buffer.from(
    JSON.stringify({ id: data.id, createdAt: data.createdAt.toISOString() })
  ).toString("base64");
};

export const decodeCursor = (cursor: string): DecodedCursor => {
  const decoded = JSON.parse(Buffer.from(cursor, "base64").toString("utf-8"));
  if (!decoded.id || !decoded.createdAt) throw new Error("Invalid cursor");
  return { id: Number(decoded.id), createdAt: new Date(decoded.createdAt) };
};
