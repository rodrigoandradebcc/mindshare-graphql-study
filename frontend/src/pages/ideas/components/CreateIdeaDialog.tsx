import { useState, type SubmitEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client/react";
import { CREATE_IDEA } from "@/lib/graphql/mutations/Idea";
import { toast } from "sonner";

interface CreateIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateIdeaDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateIdeaDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [createIdea, { loading }] = useMutation(CREATE_IDEA, {
    onCompleted() {
      toast.success("Ideia criada com sucesso");
      setTitle("");
      setDescription("");
      onOpenChange(false);
      onSuccess?.();
    },
    onError() {
      toast.error("Falha ao criar a ideia");
    },
  });

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    createIdea({
      variables: {
        data: {
          title,
          description,
        },
      },
    });
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold leading-tight">
            Nova ideia
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Adicione uma nova ideia para seu time
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div className="space-y-1">
            <Label htmlFor="title" className="text-sm font-normal">
              Título
            </Label>

            <Input
              id="title"
              disabled={loading}
              placeholder="Dê um nome para a sua ideia"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description" className="text-sm font-normal">
              Descrição
            </Label>

            <Textarea
              id="description"
              placeholder="Descreva sua ideia"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              rows={6}
              disabled={loading}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel} variant="outline" type="button">
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
