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
import { Plus } from "lucide-react"

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
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          <Plus className="h-4 w-4 mr-2" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {children} {/* Contenu dynamique comme des formulaires */}
        </div>
      </DialogContent>
    </Dialog>
  )
}