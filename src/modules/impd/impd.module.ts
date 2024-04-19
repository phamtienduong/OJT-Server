import { Module } from "@nestjs/common";
import { ImageController } from "../image/image.controller";
import { ImpdService } from "./impd.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Impd } from "./entity/impd.entity";
import { ImpdController } from "./impd.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Impd]),
    ],
    controllers: [ImpdController],
    providers: [ImpdService],
})
export class ImpdModule { }