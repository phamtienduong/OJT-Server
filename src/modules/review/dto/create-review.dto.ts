import { IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
    @IsString()
    content: string;

    @IsNumber()
    rating: number;

    @IsNumber()
    user_id: number;
}
