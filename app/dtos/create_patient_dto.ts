import {IsString, IsOptional, IsNotEmpty, IsEmail, IsNumberString} from 'class-validator';

class CreatePatientDto {
    @IsNotEmpty()
    @IsEmail()
    // @ts-ignore
    private email: string;

    @IsOptional()
    // @ts-ignore
    private photo_avatar: string;

    @IsNumberString()
    @IsNotEmpty()
    // @ts-ignore
    private phone: string;

    @IsString()
    // @ts-ignore
    private name: string
}
export default CreatePatientDto
