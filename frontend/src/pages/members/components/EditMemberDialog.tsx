import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useMutation } from "@apollo/client/react";
import type { User } from "@/types";
import { UPDATE_USER } from "@/lib/graphql/mutations/Members";

interface EditMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: User | null;
  onUpdated?: (user: User) => void;
}

const ROLE_OPTIONS = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Membro" },
  { value: "viewer", label: "Leitor" },
];

interface MemberDraft {
  memberId: string;
  name: string;
  role: string;
}

export function EditMemberDialog({
  open,
  onOpenChange,
  member,
  onUpdated,
}: EditMemberDialogProps) {
  const [draft, setDraft] = useState<MemberDraft | null>(null);

  const activeDraft = draft?.memberId === member?.id ? draft : null;
  const name = activeDraft?.name ?? member?.name ?? "";
  const role = activeDraft?.role ?? member?.role ?? "member";

  const updateDraft = (changes: Partial<Omit<MemberDraft, "memberId">>) => {
    if (!member) return;

    setDraft((currentDraft) => {
      const baseDraft =
        currentDraft?.memberId === member.id
          ? currentDraft
          : {
              memberId: member.id,
              name: member.name,
              role: member.role ?? "member",
            };

      return { ...baseDraft, ...changes };
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setDraft(null);
    onOpenChange(nextOpen);
  };

  type UpdateUserMudationData = { updateUser: User };
  type UpdateUserVariables = {
    id: string;
    data: { name?: string; role?: string };
  };

  const [updateUserMutation, { loading }] = useMutation<
    UpdateUserMudationData,
    UpdateUserVariables
  >(UPDATE_USER, {
    onCompleted: (res: UpdateUserMudationData) => {
      const updated = res.updateUser;
      if (updated) {
        onUpdated?.(updated);
      }
      handleOpenChange(false);
    },
  });

  const handleSubmit = async () => {
    if (!member) return;
    await updateUserMutation({
      variables: {
        id: member.id,
        data: {
          name,
          role,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => updateDraft({ name: e.target.value })}
              placeholder="Nome"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-role">Papel</Label>
            <select
              id="edit-role"
              className="w-full border rounded-md h-10 px-3 bg-background"
              value={role}
              onChange={(e) => updateDraft({ role: e.target.value })}
            >
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input value={member?.email ?? ""} disabled />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
