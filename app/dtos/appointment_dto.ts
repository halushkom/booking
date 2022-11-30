import {IsDate, IsNotEmpty, IsUUID} from "class-validator";

class Appointment_dto {
    //@IsDate()
    @IsNotEmpty()
    // @ts-ignore
    private date: string;

    @IsNotEmpty()
    @IsUUID()
    // @ts-ignore
    private user: string;

    @IsNotEmpty()
    @IsUUID()
    // @ts-ignore
    private doctor: string
}

export default Appointment_dto
