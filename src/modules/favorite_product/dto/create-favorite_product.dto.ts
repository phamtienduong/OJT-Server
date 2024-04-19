import { IsNumber } from "class-validator";

export class CreateFavoriteProductDto {
    @IsNumber()
    user_id: number;

    @IsNumber()
    product_id: number
}
