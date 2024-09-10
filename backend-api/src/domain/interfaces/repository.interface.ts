export interface ReadOnlyRepository<T> {
  find(options?: any): Promise<T[]>;
  findOne(options?: any): Promise<T | undefined>;
}

export interface WriteOnlyRepository<T> {
  create(data: any): T;
  save(entity: T): Promise<T>;
  remove(entity: T): Promise<void>;
}

export interface Repository<T>
  extends ReadOnlyRepository<T>,
    WriteOnlyRepository<T> {}
