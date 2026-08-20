import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import type { Idea } from "@/types";
import { DELETE_IDEA } from "@/lib/graphql/mutations/Idea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteIdeaDialogProps {
  idea: Idea | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function DeleteIdeaDialog({
  idea,
  open,
  onOpenChange,
  onSuccess,
}: DeleteIdeaDialogProps) {
  const [deleteIdea, { loading }] = useMutation(DELETE_IDEA, {
    onCompleted() {
      toast.success("Ideia excluída com sucesso");
      onOpenChange(false);
      onSuccess();
    },
    onError() {
      toast.error("Falha ao excluir a ideia");
    },
  });

  const handleDelete = () => {
    if (!idea) return;
    void deleteIdea({ variables: { id: idea.id } });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Excluir ideia</DialogTitle>
          <DialogDescription>
            Esta ação não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm">
          Tem certeza que deseja excluir <strong>{idea?.title}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
