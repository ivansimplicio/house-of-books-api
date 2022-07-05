import { DataSource, DataSourceOptions } from 'typeorm'

import ormConfig from 'ormconfig';

const source = new DataSource(ormConfig as DataSourceOptions)

export default source;