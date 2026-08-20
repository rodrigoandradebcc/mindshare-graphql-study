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
      <DialogContent
        overlayClassName="bg-black/20"
        className="w-[calc(100%_-_2rem)] max-w-[333px] gap-0 rounded-lg p-4 sm:max-w-[333px]"
      >
        <DialogHeader className="gap-0.5">
          <DialogTitle className="text-sm leading-5 font-bold">
            Compartilhe sua ideia
          </DialogTitle>

          <DialogDescription className="text-[10px] leading-4 text-muted-foreground">
            Adicione uma nova ideia para seu time
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
          <div className="space-y-1">
            <Label htmlFor="title" className="text-[11px] font-normal">
              Título
            </Label>

            <Input
              id="title"
              disabled={loading}
              placeholder="Dê um nome para a sua ideia"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-7 w-full rounded-md px-2 text-[10px]"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description" className="text-[11px] font-normal">
              Descrição
            </Label>

            <Textarea
              id="description"
              placeholder="Descreva sua ideia"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-[100px] min-h-[100px] resize-none rounded-md px-2 py-2 text-[10px]"
              disabled={loading}
            />
          </div>
          <div className="flex justify-end gap-1.5 pt-2">
            <Button
              onClick={handleCancel}
              variant="outline"
              type="button"
              className="h-7 px-3 text-[10px]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-7 px-3 text-[10px]"
            >
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
