import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react"

// Définir les types des props
interface DialogBoilerplateProps {
  title: string
  description: string
  triggerText: string
  children: ReactNode // Le contenu du formulaire ou d'autres éléments
}

export function DialogBoilerplate({
  title,
  triggerText,
  children,
}: DialogBoilerplateProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        
          <Button variant="outline" className="bg-[#161747] text-white py-5 hover:bg-[#161747 hover:text-white] mt-6">{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col gap-2 h-full">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {children} {/* Contenu dynamique comme des formulaires */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
