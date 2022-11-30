import {IsDate, IsIn, IsNotEmpty, IsUUID} from "class-validator";

class Appointment_update_dto {
    public static statuses: string[] = [
        'reject',
        'approve'
    ];

    @IsNotEmpty()
    @IsIn(Appointment_update_dto.statuses)
    // @ts-ignore
    private action: string;

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

export default Appointment_update_dto
