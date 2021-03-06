import { BaseModel } from '@models/_base.model';

import { ArticleModel } from './article.model';
import { PermissionModel } from './permission.model';

export class UserModel extends BaseModel {
  name: string;

  permissions: PermissionModel[];

  avatar?: string;

  articles: ArticleModel;
}
