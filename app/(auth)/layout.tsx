import AuthLayout from "@/components/layout/AuthLayout"
import type React from "react"
import "../../styles/auth-page.css"
import "../globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>
}
