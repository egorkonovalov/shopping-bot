import { IsString, IsOptional } from 'class-validator'


export class GetProductFilterDto {

    @IsOptional()
    @IsString()
    search?: string;
}
