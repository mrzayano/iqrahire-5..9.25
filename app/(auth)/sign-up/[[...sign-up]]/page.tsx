import { SignUp } from "@clerk/nextjs"

export default function Page() {
  
  return (
    <div className="flex flex-col items-center justify-center">

      <SignUp
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
