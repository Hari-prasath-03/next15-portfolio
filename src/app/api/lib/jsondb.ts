import fs from "fs";
const DB_PATH = "src/app/api/db";

abstract class JsonDb<T extends object> {
  protected filePath: string;

  constructor(filePath: string) {
    this.filePath = `${DB_PATH}/${filePath}.json`;
    this.ensureDbExists();
  }

  private ensureDbExists() {
    if (!fs.existsSync(this.filePath)) {
      fs.mkdirSync(DB_PATH, { recursive: true });
    }

    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(this.getDefaultContentType(), null, 2)
      );
    }
  }

  protected abstract getDefaultContentType(): object | object[];

  async readAll(): Promise<T | T[]> {
    const data = await fs.promises.readFile(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  async clear() {
    await fs.promises.writeFile(
      this.filePath,
      JSON.stringify(this.getDefaultContentType())
    );
  }
}

export class SingleRecordDb<T extends object> extends JsonDb<T> {
  constructor(filePath: string) {
    super(filePath);
  }

  protected getDefaultContentType(): object | object[] {
    return {};
  }

  async write(content: T) {
    await fs.promises.writeFile(
      this.filePath,
      JSON.stringify(content, null, 2)
    );
  }
}

export class MultiRecordDb<T extends object> extends JsonDb<T> {
  constructor(filePath: string) {
    super(filePath);
  }

  protected getDefaultContentType(): object | object[] {
    return [];
  }

  async find(query: Partial<T>): Promise<T[]> {   
    const data = (await this.readAll()) as T[];
    return data.filter((item) =>
      Object.entries(query).every(([key, value]) => {
        const itemValue = item[key as keyof T];
        if (typeof itemValue === "string" && typeof value === "string") {
          return itemValue.toLowerCase() === value.toLowerCase();
        }
        return itemValue === value;
      })
    );
  }

  async addOne(record: T) {
    const data = (await this.readAll()) as T[];
    const newRecord = { id: data.length + 1, ...record };
    data.push(newRecord);
    await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async addMany(records: T[]) {
    const data = (await this.readAll()) as T[];
    const startingId = data.length + 1;

    const newRecords = records.map((record, index) => ({
      id: startingId + index,
      ...record,
    }));

    await fs.promises.writeFile(
      this.filePath,
      JSON.stringify([...data, ...newRecords], null, 2)
    );
  }

  async updateOne(id: number, updatedRecord: Partial<T>): Promise<boolean> {
    const data = (await this.readAll()) as (T & { id: number })[];
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) return false;
    data[index] = { ...data[index], ...updatedRecord };
    await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    return true;
  }

  async deleteOne(id: number): Promise<boolean> {
    const data = (await this.readAll()) as (T & { id: number })[];
    const newData = data.filter((item) => item.id !== id);
    await fs.promises.writeFile(
      this.filePath,
      JSON.stringify(newData, null, 2)
    );
    return data.length !== newData.length;
  }

  async readOne(id: number): Promise<(T & { id: number }) | null> {
    const data = (await this.readAll()) as (T & { id: number })[];
    const record = data.find((item) => item.id === id);
    return record || null;
  }

  async deleteAll() {
    await this.clear();
  }
}
