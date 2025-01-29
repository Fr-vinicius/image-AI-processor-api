import Measure from '../models/Measures';
import AppDataSource from '../database/data-source';

interface Request {
    measure_datetime: Date;

    measure_type: string ;

    customer_code: string;

    // image: string;

}

class CreateMeasureService {
    public async execute({ customer_code, measure_datetime, measure_type}: Request): Promise<Measure> {
        const measurementsRepository = AppDataSource.getRepository(Measure); 
            
        const measurement = measurementsRepository.create({
            measure_datetime,
            measure_type,
            customer_code,
            
        })
        
        console.log('Measurement created, saving to database...');

        await measurementsRepository.save(measurement)

        console.log('Measurement saved:', measurement);

        return measurement;
    }
}

export default CreateMeasureService;