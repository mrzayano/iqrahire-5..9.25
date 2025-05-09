export default function OnboardingLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen bg-muted/40 flex flex-col items-center justify-center p-4">
        {children}
      </div>
    )
  }
  