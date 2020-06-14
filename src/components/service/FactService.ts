import axios , { AxiosInstance} from "axios";
import Facts from "../dto/Fact";

class FactService {
    private api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: "https://cat-fact.herokuapp.com"
        })
    }

    fetchAllFacts = async(): Promise<Array<Facts>> => {
        return new Promise((resolve, reject) => {
            this.api.get("/facts").then((item) => {
                const facts:Array<Facts> = item.data.all
                resolve(facts)
            })
            .catch(error => {
                reject(error)
            })
        })
        
    }
}

export default FactService;