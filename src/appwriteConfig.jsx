import { Client, Account } from 'appwrite';

const client = new Client();
client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('67c75cc7000c546a2491');

export const account = new Account(client)

export default client;