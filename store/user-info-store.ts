import {create} from "zustand"
type State={
    email:string,
      setUserEmail:(email:string)=>void
}
type Action={
    setUserEmail:(email:string)=>void
}

const useUserInfoStore = create<State & Action>((set) => ({
    email: "",
    setUserEmail: (email: string) => set(() => ({ email }))
  }));