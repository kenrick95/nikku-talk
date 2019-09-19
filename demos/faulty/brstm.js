import { Brstm as BrstmShared } from '../shared/brstm.js';
import imaadpcm from 'https://dev.jspm.io/imaadpcm@4.1.2';

export class Brstm extends BrstmShared {
  getAllSamples() {
    if (this._cachedSamples) {
      return this._cachedSamples;
    }

    const dataChunkData = this._getPartitionedDataChunkData();

    const result = dataChunkData.map((adpcmSamples) => {
      return imaadpcm.decode(adpcmSamples, this.metadata.blockSize);
    });

    this._cachedSamples = result;

    return result;
  }
}
