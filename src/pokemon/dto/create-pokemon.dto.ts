import {  IsPositive, IsString, IsDefined, IsNotEmpty, Min, MinLength, IsAlphanumeric, IsInt } from "class-validator"

export class CreatePokemonDto {

    @IsDefined()
    @MinLength(2)
    @IsAlphanumeric()
    @IsString({message: "The name must be a string"})
    name: string ;

    @IsDefined()
    @Min(1)
    @IsInt()
    @IsPositive()
    no: number; 

}
