import {Response , NextFunction , Request } from 'express';
import logger from '../logger/logger';
import { CorrelationRequest } from '../correlation/correlationId';
import AppError from './appError';

export default function errorHandler(err:AppError, req:CorrelationRequest, res: Response, next: NextFunction) {

    const operational = err.isOperational 
    
 
    logger.error(err.message , {
        statusCode : err.statusCode,
        stack : err.stack,
        operational:operational,
        body:req.body,
        correlationId : req.correlationId
    })

if(operational){
    return res.status(err.statusCode).json({
        error:err.message,
    })
}
    return res.status(500).json({
         error:"something went wrong"
    });
}
