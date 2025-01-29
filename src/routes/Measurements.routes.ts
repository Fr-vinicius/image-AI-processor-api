import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";


import CreateMeasureService from '../services/CreateMeasureService'
import AppDataSource from "../database/data-source";
import Measure from "../models/Measures";

const measurementsRouter = Router();

const isValidBase64 = (str: string): boolean => {
    if (typeof str !== 'string' || str.trim() === '') {
        return false;
    }
    const base64Regex = /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
    return base64Regex.test(str);
};

// Função para verificar se uma string é "WATER" ou "GAS" (case insensitive)
const isValidType = (type: string): boolean => {
    if (typeof type !== 'string' || type.trim() === '') {
        return false;
    }
    const validTypes = ["WATER", "GAS"];
    return validTypes.includes(type.toUpperCase());
};

// Função para verificar se uma entrada é uma string não vazia
const isValidString = (str: string): boolean => {
    return typeof str === 'string' && str.trim() !== '';
};

// Função para verificar se uma string é uma data válida
const isValidDate = (dateStr: string): boolean => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
};


measurementsRouter.get('/', async (request, response) => {
    const measureRepository = AppDataSource.getRepository(Measure);
    const measures = await measureRepository.find();
    return response.json(measures);
});

measurementsRouter.post('/', async (request, response)=>{
    try {
        const {image, customer_code, measure_datetime, measure_type} = request.body;

        if (!isValidDate(measure_datetime)) {
            return response.status(400).json({ error: 'Data da medição inválida.' });
        }

        if (!isValidString(customer_code)) {
            return response.status(400).json({ error: 'Código do cliente inválido.' });
        }

        if (!isValidType(measure_type)) {
            return response.status(400).json({ error: 'Tipo de medição inválido. Deve ser "WATER" ou "GAS".' });
        }

        if (!isValidBase64(image)) {
            return response.status(400).json({ error: 'A imagem não é uma string Base64 válida.' });
        }

        const createMeasure = new CreateMeasureService();

        const measurement = await createMeasure.execute({ customer_code, measure_datetime, measure_type})

        return response.json(measurement)
    } catch (err) {
        return response.status(400)
    }
});

export default measurementsRouter