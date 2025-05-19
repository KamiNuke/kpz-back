import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorEdit = async (req: Request, res: Response, next: NextFunction) => {
  let { title, content } = req.body;
  const errorsValidation: ErrorValidation[] = [];
  const postRepository = getRepository(Post);

  title = !title ? '' : title;
  content = !content ? '' : content;

  const post = await postRepository.findOne({ where: { title } });
  if (post && post.id !== Number(req.params.id)) {
    errorsValidation.push({ title: `Post with title '${title}' already exists` });
  }

  if (!title) {
    errorsValidation.push({ title: 'Title is required' });
  }
  if (!content) {
    errorsValidation.push({ content: 'Content is required' });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Edit post validation error', null, null, errorsValidation);
    return next(customError);
  }

  return next();
};
