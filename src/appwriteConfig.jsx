import { Client, Account, Databases, Query } from "appwrite";

const client = new Client();

client
client.setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67d5ffab003bd6b6f70e"); 

export const account = new Account(client);
export const databases = new Databases(client); 

export default client;
