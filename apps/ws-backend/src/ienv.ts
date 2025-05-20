import { config } from "dotenv"


config()
interface Ienv{
    [keys:string]:string
}

const env=process.env as Ienv

export default env