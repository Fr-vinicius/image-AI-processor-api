import { Repository } from 'typeorm';
import Measure from "../models/Measures"; 
import AppDataSource from '../database/data-source';

class MeasurementsRepository extends Repository<Measure> {

    isValidBase64(str: string): boolean {
        if (!str || typeof str !== 'string') {
            return false;
        }
    
        const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
    
        return base64Regex.test(str);
    }
}

export default MeasurementsRepository;
