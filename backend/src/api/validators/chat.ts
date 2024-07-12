import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import { postChatRoomSchema, getChatRoomSchema } from '../../schemas/chat.schema';
import { postMessageSchema, getMessageSchema } from '../../schemas/chat.schema';

export const postChatRoomValidator = async (req: Request, res: Response, next: NextFunction) => {
    const postChatRoom = req.body;

    const result = await postChatRoomSchema.validateAsync(postChatRoom);

    if (!result) {
        console.log('validator Error');
        //throw new Error();
    }

    next();

    /** catch(error){
        if(error instanceof ValidationError){
            res.status(500).send(`User Validation error : ${error.message}`);
        }else{
            res.status(500).send(`User err :  ${error}`);
        }
    } */
};

export const getChatRoomValidator = async (req: Request, res: Response, next: NextFunction) => {
    const getChatRoom = req.body;

    const result = await getChatRoomSchema.validateAsync(getChatRoom);

    if (!result) {
        console.log('validator Error');
        //throw new Error();
    }

    next();
};

export const postMessageValidator = async (req: Request, res: Response, next: NextFunction) => {
    const postMessage = req.body;

    const result = await postMessageSchema.validateAsync(postMessage);

    if (!result) {
        console.log('validator Error');
        //throw new Error();
    }

    next();
};
export const getMessageValidator = async (req: Request, res: Response, next: NextFunction) => {
    const getMessage = req.body;

    const result = await getMessageSchema.validateAsync(getMessage);

    if (!result) {
        console.log('validator Error');
        //throw new Error();
    }

    next();
};
