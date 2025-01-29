import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('measurements')
class Measure {
    @PrimaryGeneratedColumn('uuid')
    measure_id: string;

    @Column('uuid')
    image_id: string;

    @Column('varchar')
    customer_code: string;

    @Column('datetime')
    measure_datetime: Date;

    @Column('varchar')
    measure_type: string;

    @Column('int')
    measure_value: number;

    @Column('varchar')
    image_url: string;

    @Column('bit')
    has_confirmed: boolean;
}

export default Measure;
