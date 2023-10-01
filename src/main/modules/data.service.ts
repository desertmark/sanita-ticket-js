import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import MDBReader from 'mdb-reader';
import { resolve } from 'path';

@Injectable()
export class DataService {
  private logger = new Logger('DataService');
  public data: any[] = [];

  async load(path: string, table: string) {
    try {
      this.logger.log(`Loading table: ${table} from from path: ${path}`);
      const reader = new MDBReader(readFileSync(resolve(path)));
      const lista = reader.getTable(table);

      this.logger.log(`Loading data`);
      this.data = await lista.getData();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
