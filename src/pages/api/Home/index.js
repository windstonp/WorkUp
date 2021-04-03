import { getSession } from "next-auth/client";

export default async (req, res)=>{
    const session = await getSession({req});

    if(session){
        res.send({user: session.user});
    }
    else{
        res.status(401).send({
            error: "Not logged"
        })
    }
};