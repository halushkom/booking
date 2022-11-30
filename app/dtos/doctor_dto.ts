import {IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString} from "class-validator";

class Doctor_dto {
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
    private name: string;

    @IsNotEmpty()
    // @ts-ignore
    private spec: string;

    @IsNotEmpty()
    // @ts-ignore
    private free: boolean
}

export default Doctor_dto
