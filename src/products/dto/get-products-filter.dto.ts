import { IsString, IsOptional } from 'class-validator'


export class GetProductsFilterDto {

    @IsOptional()
    @IsString()
    search?: string;
}
