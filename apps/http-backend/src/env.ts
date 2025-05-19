import { config } from "dotenv"

config()
interface Ienv{
    [keys:string]:string
}

const ienv=process.env as Ienv

export default ienv