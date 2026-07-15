import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatriculaModule } from './matricula/matricula.module';
import { CortesiaModule } from './cortesia/cortesia.module';

@Module({
  imports: [MatriculaModule, CortesiaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
