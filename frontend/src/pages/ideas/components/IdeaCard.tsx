import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Pencil, ThumbsUp, Trash2 } from "lucide-react";
import type { Idea } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatRelativeDate } from "@/lib/utils";

interface IdeaCardProps {
  idea: Idea;
  isOwner: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function IdeaCard({
  idea,
  isOwner,
  onClick,
  onEdit,
  onDelete,
}: IdeaCardProps) {
  const handleAction = (
    event: React.MouseEvent<HTMLButtonElement>,
    action: () => void,
  ) => {
    event.stopPropagation();
    action();
  };

  return (
    <Card
      onClick={onClick}
      className="h-[181px] cursor-pointer gap-0 rounded-lg px-4 py-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <Avatar className="size-[18px]">
            <AvatarFallback className="bg-slate-900 text-[7px] text-primary-foreground">
              {idea.author?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-[10px] text-slate-600">
            {idea.author?.name || "Usuário"}
          </span>
          {isOwner ? (
            <span className="rounded-md border bg-slate-50 px-1.5 py-0.5 text-[9px] text-slate-700">
              você
            </span>
          ) : null}
        </div>

        {isOwner ? (
          <div className="flex shrink-0 gap-1">
            <Button
              aria-label={`Excluir ${idea.title}`}
              size="icon-xs"
              variant="outline"
              onClick={(event) => handleAction(event, onDelete)}
            >
              <Trash2 className="size-3" />
            </Button>
            <Button
              aria-label={`Editar ${idea.title}`}
              size="icon-xs"
              variant="outline"
              onClick={(event) => handleAction(event, onEdit)}
            >
              <Pencil className="size-3" />
            </Button>
          </div>
        ) : null}
      </div>

      <h2 className="mt-2 truncate text-sm font-medium text-slate-900">
        <button
          type="button"
          className="max-w-full truncate text-left outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
          onClick={(event) => handleAction(event, onClick)}
        >
          {idea.title}
        </button>
      </h2>
      <p className="mt-1 line-clamp-2 text-xs leading-[18px] text-slate-600">
        {idea.description || ""}
      </p>

      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="flex h-6 items-center gap-2 rounded-md border px-1.5 text-[10px] text-slate-700">
            <MessageSquare className="size-3 text-indigo-500" />
            {idea.comments?.length || 0}
          </span>
          <span className="flex h-6 items-center gap-2 rounded-md border px-1.5 text-[10px] text-slate-700">
            <ThumbsUp className="size-3 text-emerald-500" />
            {idea.countVotes || 0}
          </span>
        </div>
        <span className="shrink-0 text-[10px] text-slate-500">
          {formatRelativeDate(idea.createdAt)}
        </span>
      </div>
    </Card>
  );
}
