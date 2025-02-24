import { useAuth } from "@/Context/userContext"
import { Outlet } from "react-router-dom"

function Validate() {
  const {user}=useAuth()
  return (
    <>
    {
        user?
        <Outlet/>:(

            <>
            <h1>please login</h1>
            </>
        )
        

    }
    </>
  )
}

export default Validate