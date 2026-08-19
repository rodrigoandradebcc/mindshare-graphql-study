import { Button } from "@/components/ui/button";
import { Page } from "../../components/Page";
import { Label } from "../../components/ui/label";
import { Plus } from "lucide-react";
import { CreateIdeaDialog } from "./components/CreateIdeaDialog";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { LIST_IDEAS } from "@/lib/graphql/queries/ideas";
import { IdeaCard } from "./components/IdeaCard";
import { IdeaDetailDrawer } from "./components/IdeaDetailDrawer";

export function IdeasPage() {
  const [open, setOpen] = useState(false);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const { data, loading, refetch } = useQuery(LIST_IDEAS);

  const [openDrawer, setOpenDrawer] = useState(false);

  const ideas = data?.listIdeas ?? [];

  const handleIdeaClick = (ideaId: string) => {
    setSelectedIdeaId(ideaId);
    setOpenDrawer(true);
  };

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label className="text-3xl font-medium text-purple-600">Ideias</Label>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova ideia
          </Button>
        </div>
      </div>
      {loading ? (
        <p className="pt-6 text-sm text-muted-foreground">
          Carregando ideias...
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-6">
          {ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onClick={() => handleIdeaClick(idea.id)}
            />
          ))}
        </div>
      )}
      <IdeaDetailDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        ideaId={selectedIdeaId}
      />
      <CreateIdeaDialog
        onOpenChange={setOpen}
        onSuccess={() => void refetch()}
        open={open}
      />
    </Page>
  );
}
