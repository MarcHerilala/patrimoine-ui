import { ChangeEvent, useState } from "react"
import { DialogBoilerplate } from "../dialog"
import CreateMoneyForm from "./argent/create-form"
import CreateMaterialForm from "./material/create-form"

export const PossessionFormContainer=()=>{
    const [possessionType,setPossessionType]=useState("argent")

    const handleOnTypeChange=(e:ChangeEvent<HTMLSelectElement>)=>{
        setPossessionType(e.target.value)
    }
    
    return(
       
           <div className="flex flex-col gap-2 items-center justify-center">
                <div className="flex flex-col gap-2 w-full max-w-[375px]">
                        <label htmlFor="">type</label>
                        <select  className="bg-transparent border outline-none rounded-sm h-10"
                        onChange={handleOnTypeChange}
                        >
                            <option value="argent">argent</option>
                            <option value="materiel">materiel</option>
                        </select>
                    </div>
                    <div className="w-full">
                    {
                            possessionType === "argent" ? (
                                <CreateMoneyForm />
                            ) : possessionType === "materiel" ? (
                                <CreateMaterialForm />
                            ) : null
                         }
                    </div>
           </div>
    )
}