import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const geminiRouter = Router();

geminiRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { image } = request.body; // Supondo que o JSON tenha uma chave "image" com o base64

    if (!image) {
      return response.status(400).send("Imagem não fornecida.");
    }

    const base64Pattern = /^data:image\/(jpeg|png|gif);base64,/;
    const matches = image.match(base64Pattern);

    if (!matches) {
      return response.status(400).send("Formato de imagem inválido.");
    }

    const mimeType = matches[1];
    const base64Data = image.replace(base64Pattern, "");

    // Criar um arquivo temporário com um nome único
    const tempFileName = `${uuidv4()}.${mimeType}`;
    const tempFilePath = path.join(__dirname, tempFileName);

    fs.writeFileSync(tempFilePath, base64Data, 'base64');

    const uploadResponse = await fileManager.uploadFile(tempFilePath, {
      mimeType: `image/${mimeType}`,
      displayName: "Jetpack drawing",
    });

    fs.unlinkSync(tempFilePath);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-Flash",
    });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri
        }
      },
      { text: "Describe this image." },
    ]);

    console.log(result.response.text());

    response.status(200).send({
      message: "Arquivo enviado e conteúdo gerado com sucesso",
      fileUri: uploadResponse.file.uri,
      generatedText: result.response.text()
    });

  } catch (error) {
    console.error("Falha no upload do arquivo ou geração de conteúdo:", error);
    response.status(500).send("Erro ao processar o upload do arquivo ou gerar conteúdo.");
  }
});

export default geminiRouter;
