import crypto from "crypto";
import IEncryptor from "./encryptor-interface";

export function makeBcryptEncryptor(secret: string): IEncryptor {
  return {
    encrypt(text: string): string {
      return crypto.createHmac("sha256", secret).update(text).digest("hex");
    },

    checkEquals(text: string, encryptedText: string): boolean {
      return this.encrypt(text) === encryptedText;
    },
  };
}
