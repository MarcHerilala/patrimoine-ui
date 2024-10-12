import { cookies } from 'next/headers';
import {create} from 'zustand';
interface AuthState{
  token:string | null,
  setToken:(newToken:string)=>void,
  clearToken:()=>void
}
const cookieStore=cookies()

const initialToken=()=>{
  const token=cookieStore.get("token")?.value
  return token || null
}
export const useAuthStore = create<AuthState>((set) => ({
  token: initialToken(),
  setToken: (newToken:string) => {
    set({ token: newToken });
    cookieStore.set("token",newToken)

    
  },
  clearToken: () => {
    set({ token: null });
    cookieStore.delete("token")
  },
}));
