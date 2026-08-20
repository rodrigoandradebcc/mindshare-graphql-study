import {
  Drawer,
  DrawerContentRight,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { GET_IDEA } from "@/lib/graphql/queries/Ideas";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CommentsList } from "./CommentsList";
import { CommentArea } from "./CommentArea";
import { toast } from "sonner";
import { CREATE_COMMENT } from "@/lib/graphql/mutations/Comment";
import { TOGGLE_VOTE } from "@/lib/graphql/mutations/Vote";

interface IdeaDetailDrawerProps {
  ideaId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IdeaDetailDrawer({
  open,
  onOpenChange,
  ideaId,
}: IdeaDetailDrawerProps) {
  const [commentContent, setCommentContent] = useState("");

  const [getIdea, { data, loading }] = useLazyQuery(GET_IDEA, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!open || !ideaId) return;

    void getIdea({ variables: { ideaId } });
  }, [getIdea, ideaId, open]);
  const [createCommentMutation] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      setCommentContent("");
      if (ideaId) void getIdea({ variables: { ideaId } });
    },
  });

  const [toggleVoteMutation] = useMutation(TOGGLE_VOTE, {
    onCompleted: () => {
      if (ideaId) void getIdea({ variables: { ideaId } });
    },
  });

  const handleToggleVote = () => {
    toggleVoteMutation({
      variables: {
        ideaId,
      },
    });
  };

  const handleAddComment = () => {
    if (!commentContent.trim()) {
      toast.error("Por favor insira um comentário");
      return;
    }

    createCommentMutation({
      variables: {
        ideaId,
        data: {
          content: commentContent,
        },
      },
    });
  };

  const { getIdea: idea } = data || {};

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContentRight className="flex flex-col rounded-l-2xl">
        <div className="flex-shrink-0 p-6 bg-slate-100 rounded-l-2xl">
          <div className="flex items-start justify-between">
            <DrawerTitle className="text-2xl font-bold pr-4 flex-1">
              {loading ? "Carregando..." : (idea?.title ?? "Detalhes da ideia")}
            </DrawerTitle>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Fechar detalhes da ideia"
              onClick={() => onOpenChange(false)}
              className="flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          {idea && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {idea?.description || ""}
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <CommentsList comments={idea?.comments || []} loading={loading} />
        </div>
        <CommentArea
          commentContent={commentContent || ""}
          setCommentContent={setCommentContent}
          handleAddComment={handleAddComment}
          handleVote={handleToggleVote}
          idea={idea}
        />
      </DrawerContentRight>
    </Drawer>
  );
}
