import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import {
  CalendarDays,
  ChevronDown,
  Lightbulb,
  MessageSquare,
  Plus,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Page } from "@/components/Page";
import { LIST_IDEAS } from "@/lib/graphql/queries/Ideas";
import { useAuthStore } from "@/stores/auth";
import type { Idea } from "@/types";
import { toast } from "sonner";
import { CreateIdeaDialog } from "./components/CreateIdeaDialog";
import { DeleteIdeaDialog } from "./components/DeleteIdeaDialog";
import { EditIdeaDialog } from "./components/EditIdeaDialog";
import { IdeaCard } from "./components/IdeaCard";
import { IdeaDetailDrawer } from "./components/IdeaDetailDrawer";

type SortOrder = "newest" | "oldest";
const EMPTY_IDEAS: Idea[] = [];

export function IdeasPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const userId = useAuthStore((state) => state.user?.id);
  const { data, loading, refetch } = useQuery(LIST_IDEAS);
  const ideas = data?.listIdeas ?? EMPTY_IDEAS;

  const sortedIdeas = useMemo(
    () =>
      [...ideas].sort((first, second) => {
        const firstDate = new Date(first.createdAt).getTime();
        const secondDate = new Date(second.createdAt).getTime();
        return sortOrder === "newest"
          ? secondDate - firstDate
          : firstDate - secondDate;
      }),
    [ideas, sortOrder],
  );

  const totals = useMemo(
    () =>
      ideas.reduce(
        (result, idea) => ({
          comments: result.comments + (idea.comments?.length ?? 0),
          votes: result.votes + (idea.countVotes ?? 0),
        }),
        { comments: 0, votes: 0 },
      ),
    [ideas],
  );

  const refreshIdeas = () => {
    void refetch().catch(() => {
      toast.error("Não foi possível atualizar a lista de ideias");
    });
  };

  const openDetails = (idea: Idea) => {
    setSelectedIdea(idea);
    setDrawerOpen(true);
  };

  return (
    <Page variant="ideas">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-purple-600">Ideias</h1>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="flex h-[21px] items-center gap-2 rounded-md bg-purple-100 px-2 text-[10px] font-medium text-slate-800">
              <Lightbulb className="size-3" />
              {ideas.length} {ideas.length === 1 ? "ideia" : "ideias"}
            </span>
            <span className="flex h-[21px] items-center gap-2 rounded-md bg-indigo-100 px-2 text-[10px] font-medium text-slate-800">
              <MessageSquare className="size-3" />
              {totals.comments} comentários
            </span>
            <span className="flex h-[21px] items-center gap-2 rounded-md bg-emerald-100 px-2 text-[10px] font-medium text-slate-800">
              <ThumbsUp className="size-3" />
              {totals.votes} votos
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="idea-sort" className="text-xs text-slate-800">
            Ordenar por:
          </label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-600" />
            <select
              id="idea-sort"
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(event.target.value as SortOrder)
              }
              className="h-9 appearance-none rounded-lg border bg-white pr-8 pl-9 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="newest">Mais recentes</option>
              <option value="oldest">Mais antigas</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-slate-500" />
          </div>
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />
          <Button className="h-9 px-4 text-xs" onClick={() => setCreateOpen(true)}>
            <Plus className="size-4" />
            Nova ideia
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="pt-7 text-sm text-muted-foreground">
          Carregando ideias...
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 pt-[26px] sm:grid-cols-2 lg:grid-cols-4">
          {sortedIdeas.map((idea) => {
            const isOwner = idea.authorId === userId;
            return (
              <IdeaCard
                key={idea.id}
                idea={idea}
                isOwner={isOwner}
                onClick={() => openDetails(idea)}
                onEdit={() => {
                  setSelectedIdea(idea);
                  setEditOpen(true);
                }}
                onDelete={() => {
                  setSelectedIdea(idea);
                  setDeleteOpen(true);
                }}
              />
            );
          })}
        </div>
      )}

      <IdeaDetailDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        ideaId={selectedIdea?.id ?? null}
      />
      <CreateIdeaDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={refreshIdeas}
      />
      <EditIdeaDialog
        idea={selectedIdea}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSuccess={refreshIdeas}
      />
      <DeleteIdeaDialog
        idea={selectedIdea}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onSuccess={refreshIdeas}
      />
    </Page>
  );
}
