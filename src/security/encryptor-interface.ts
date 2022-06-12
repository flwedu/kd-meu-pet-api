export default interface IEncryptor {
  encrypt(text: string): string;
  checkEquals(text: string, encryptedText: string): boolean;
}
