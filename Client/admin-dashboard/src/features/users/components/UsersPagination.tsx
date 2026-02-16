import { Button } from "@/components/ui/button";
import type { UsersMeta } from "../users.types";

interface Props {
  meta?: UsersMeta;
  setAfter: (cursor?: string) => void;
  setBefore: (cursor?: string) => void;
}

export default function UsersPagination({ meta, setAfter, setBefore }: Props) {
  if (!meta) return null;

  return (
    <div className="flex justify-between mt-4">
      <Button
        disabled={!meta.prevCursor}
        onClick={() => {
          setBefore(meta.prevCursor ?? undefined);
          setAfter(undefined);
        }}
      >
        Previous
      </Button>

      <Button
        disabled={!meta.nextCursor}
        onClick={() => {
          setAfter(meta.nextCursor ?? undefined);
          setBefore(undefined);
        }}
      >
        Next
      </Button>
    </div>
  );
}
