import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Measurements1724953369521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Measurements',
            columns: [
                {
                    name: 'customer_code',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'measure_value',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'image_url',
                    type: 'varchar',
                    isNullable: true,
                },            
                {
                    name: 'measure_type',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'measure_datetime',
                    type: 'datetime',
                    isNullable: false,
                },
                {
                    name: 'measure_id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'NEWID()',
                    isNullable: true,
                },
                {
                    name: 'image_id',
                    type: 'varchar',
                    isNullable: true,
                    generationStrategy: 'uuid',
                    default: 'NEWID()',
                    
                },
                {
                    name: 'has_confirmed',
                    type: 'bit',
                    isNullable: true,
                    default: 0,
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('measurements');

    }

}
