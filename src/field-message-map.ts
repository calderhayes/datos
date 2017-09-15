import {IFieldMessage} from 'utility';

interface IFieldMessageElement {
  key: string;
  value: IFieldMessage;
}

export class FieldMessageMap {

  private fieldMessages: Array<IFieldMessageElement>;

  constructor() {
    this.fieldMessages = new Array<IFieldMessageElement>();
  }

  public clear() {
    this.fieldMessages = [];
  }

  public add(key: string, value: IFieldMessage) {
    const index = this.fieldMessages.findIndex((f) => f.key === key);
    if (index === -1) {
      this.fieldMessages.push({
        key,
        value
      });
    }
    else {
      this.fieldMessages[index] = {
        key,
        value
      };
    }
  }

  public remove(key: string) {
    const index = this.fieldMessages.findIndex((f) => f.key === key);
    if (index !== -1) {
      return;
    }
    this.fieldMessages.splice(index, 1);
  }

  public get(key: string) {
    const index = this.fieldMessages.findIndex((f) => f.key === key);
    if (index !== -1) {
      return this.fieldMessages[index].value;
    }
    else {
      return null;
    }
  }

  public canSubmit() {
    return !this.fieldMessages.find((e) => e.value.preventSubmitError);
  }

  public addOrOverrideWithMap(map: FieldMessageMap) {
    const newMap = new FieldMessageMap();
    newMap.fieldMessages = this.fieldMessages.slice(0);
    map.fieldMessages.forEach((e) => {
      newMap.add(e.key, e.value);
    });

    return newMap;
  }
}
