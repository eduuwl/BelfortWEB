import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCortesiaDto } from './dto/create-cortesia.dto';

@Injectable()
export class CortesiaService {
  private readonly logger = new Logger(CortesiaService.name);

  async forward(dto: CreateCortesiaDto): Promise<void> {
    const url = process.env.APPS_SCRIPT_URL_CORTESIA;
    if (!url) {
      throw new InternalServerErrorException(
        'APPS_SCRIPT_URL_CORTESIA não configurada',
      );
    }

    const payload = {
      tipo: 'cortesia',
      ...dto,
      timestamp: new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Belem',
      }),
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      this.logger.error(`Apps Script (cortesia) respondeu ${response.status}`);
      throw new InternalServerErrorException('Falha ao enviar agendamento');
    }
  }
}
