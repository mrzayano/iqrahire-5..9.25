import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome Back to IqraHire</h1>
      <SignIn
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-lg rounded-lg border border-border",
            headerTitle: "text-2xl font-semibold text-primary",
            headerSubtitle: "text-muted-foreground",
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            formFieldInput: "rounded border-input",
            footerActionLink: "text-primary hover:text-primary/90",
          },
        }}
      />
    </div>
  )
}
