export interface DecodedCursor {
  id: number;
  createdAt: Date;
}

/**
 * Encode cursor data to an opaque string (for frontend)
 */
export const encodeCursor = (data: {
  id: number;
  createdAt: Date;
}): string => {
  return Buffer.from(
    JSON.stringify({
      id: data.id,
      createdAt: data.createdAt.toISOString(),
    })
  ).toString("base64");
};

/**
 * Decode cursor string back to usable values (for backend)
 */
export const decodeCursor = (cursor: string): DecodedCursor => {
  try {
    const decoded = JSON.parse(
      Buffer.from(cursor, "base64").toString("utf-8")
    );

    if (!decoded.id || !decoded.createdAt) {
      throw new Error("Invalid cursor shape");
    }

    return {
      id: Number(decoded.id),
      createdAt: new Date(decoded.createdAt),
    };
  } catch {
    throw new Error("Invalid cursor");
  }
};
