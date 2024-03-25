import { BASEURL, Languages, RUNURL } from "@/appConstants";
import axios from "axios";

export default async function executeCode(lang: any, code: any, inputA: any) {
    const language = Languages.find((l) => l.language === lang);
    const response = await axios.post(`${BASEURL}${RUNURL}`, {
        "language": lang,
        "version": language!.version,
        "files": [
            {
                "name": "main",
                "content": code
            }
        ],
        "stdin": inputA 
    });

    return response.data;
}
