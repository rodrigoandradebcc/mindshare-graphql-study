interface PageProps {
  children: React.ReactNode;
  variant?: "default" | "ideas";
}

export function Page({ children, variant = "default" }: PageProps) {
  return (
    <div
      className={
        variant === "ideas"
          ? "min-h-[calc(100vh-5.125rem)] rounded-t-[18px] bg-white p-4 sm:rounded-[18px] sm:p-6 lg:p-[42px]"
          : "min-h-[calc(100vh-9rem)] rounded-xl bg-white p-12"
      }
    >
      {children}
    </div>
  );
}
