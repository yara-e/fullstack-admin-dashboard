import {Request , Response , NextFunction} from "express"
import crypto from "crypto";

export interface CorrelationRequest extends Request{
    correlationId? : string
}

export default function correlationId(req:CorrelationRequest , res: Response , next: NextFunction ){
    const id = crypto.randomUUID();
    req.correlationId = id
    res.setHeader ("X-Correlation-Id" , id)
    next();
}
 
