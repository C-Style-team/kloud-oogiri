import { IsString, IsNotEmpty, Min, Max } from 'class-validator'
export class CreateSubjectDio {
    @IsNotEmpty()
    @IsString()
    text: string

    @IsNotEmpty()
    @IsString()
    aythor: string
}
