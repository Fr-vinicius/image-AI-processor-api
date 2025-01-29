// express-multer.d.ts
import { Request } from 'express';
import { File } from 'multer';

declare module 'express-serve-static-core' {
  interface Request {
    file?: File; // Para lidar com um único arquivo
    files?: File[]; // Caso você queira suportar múltiplos arquivos no futuro
  }
}
