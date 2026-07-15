import { Module } from '@nestjs/common';
import { CortesiaController } from './cortesia.controller';
import { CortesiaService } from './cortesia.service';

@Module({
  controllers: [CortesiaController],
  providers: [CortesiaService],
})
export class CortesiaModule {}
