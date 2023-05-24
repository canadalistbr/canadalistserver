import { NextFunction, Request, Response } from 'express'

export const cors =(req:Request,res:Response,next:NextFunction) => {
    res.set('access-control-origin', '*')
    res.set('access-control-methods', '*')
    res.set('access-control-headers', '*')
    next()
}