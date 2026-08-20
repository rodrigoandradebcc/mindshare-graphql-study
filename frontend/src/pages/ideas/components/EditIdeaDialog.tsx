import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import type { Idea } from "@/types";
import { UPDATE_IDEA } from "@/lib/graphql/mutations/Idea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EditIdeaDialogProps {
  idea: Idea | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface IdeaDraft {
  ideaId: string;
  title: string;
  description: string;
}

export function EditIdeaDialog({
  idea,
  open,
  onOpenChange,
  onSuccess,
}: EditIdeaDialogProps) {
  const [draft, setDraft] = useState<IdeaDraft | null>(null);
  const activeDraft = draft?.ideaId === idea?.id ? draft : null;
  const title = activeDraft?.title ?? idea?.title ?? "";
  const description = activeDraft?.description ?? idea?.description ?? "";

  const updateDraft = (changes: Partial<Omit<IdeaDraft, "ideaId">>) => {
    if (!idea) return;
    setDraft((current) => ({
      ideaId: idea.id,
      title: current?.ideaId === idea.id ? current.title : idea.title,
      description:
        current?.ideaId === idea.id
          ? current.description
          : (idea.description ?? ""),
      ...changes,
    }));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setDraft(null);
    onOpenChange(nextOpen);
  };

  const [updateIdea, { loading }] = useMutation(UPDATE_IDEA, {
    onCompleted() {
      toast.success("Ideia atualizada com sucesso");
      handleOpenChange(false);
      onSuccess();
    },
    onError() {
      toast.error("Falha ao atualizar a ideia");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!idea) return;
    void updateIdea({
      variables: { id: idea.id, data: { title, description } },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Editar ideia</DialogTitle>
          <DialogDescription>Atualize os dados da sua ideia</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-idea-title">Título</Label>
            <Input
              id="edit-idea-title"
              value={title}
              onChange={(event) => updateDraft({ title: event.target.value })}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit-idea-description">Descrição</Label>
            <Textarea
              id="edit-idea-description"
              value={description}
              onChange={(event) =>
                updateDraft({ description: event.target.value })
              }
              disabled={loading}
              className="min-h-28 resize-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
