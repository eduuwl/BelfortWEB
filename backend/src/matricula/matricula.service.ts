import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';

@Injectable()
export class MatriculaService {
  private readonly logger = new Logger(MatriculaService.name);

  async forward(dto: CreateMatriculaDto): Promise<void> {
    const url = process.env.APPS_SCRIPT_URL_MATRICULA;
    if (!url) {
      throw new InternalServerErrorException(
        'APPS_SCRIPT_URL_MATRICULA não configurada',
      );
    }

    const payload = {
      tipo: 'matricula',
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
      this.logger.error(`Apps Script (matrícula) respondeu ${response.status}`);
      throw new InternalServerErrorException('Falha ao enviar pré-cadastro');
    }
  }
}
