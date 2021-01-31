import { Request } from 'express';
import * as fb from 'firebase-admin';

export interface AuthenticatedRequest extends Request {
  user: fb.auth.DecodedIdToken;
}
